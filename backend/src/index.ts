import express from "express";
import { config } from "dotenv";
config();
import { connect, ContentModel, LinkModel, UserModel } from "./db.js";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import bcrypt from "bcrypt";
import { random } from "./utils.js";
import cors from "cors"
const app = express();

app.use(cors({
    origin: "https://brainly-memory.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const hashed = await bcrypt.hash(password, 10);

        // Create the user
        await UserModel.create({
            username,
            password: hashed
        });

        res.json({ message: "User signed up" });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        res.status(500).json({ message: errorMessage });
    }

})

app.post("/api/v1/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            return res.status(403).json({ message: "Incorrect credentials" });
        }

        if (!existingUser.password) {
            return res.status(500).json({ message: "User password is missing or invalid" });
        }

        const same = await bcrypt.compare(password, existingUser.password);
        if (!same) {
            return res.status(403).json({ message: "Incorrect credentials" });
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD, {
            expiresIn: '24h'
        });

        res.setHeader("Authorization", token);
        res.json({ token });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        res.status(500).json({ message: errorMessage });
    }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, title, type } = req.body;
    await ContentModel.create({
        link,
        title,
        type,
        userId: req.userId,
        tags: []
    })
    res.json({ message: "Content Added" });
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.json({ content })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })

})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        })

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }

        const hash = random(10)
        await LinkModel.create({
            userId: req.userId,
            hash: hash
        })
        res.json({
            hash: hash
        })

    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        })
        res.json({
            message: "Removed shareable link"
        })
    }


})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash
    })

    if (!link) {
        res.status(411).json({
            message: "Sorry!! Link not found"
        })
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    res.json({
        username: user?.username,
        content: content
    })
})

app.get("/api/v1/validate", async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decoded = jwt.verify(token, JWT_PASSWORD)
            res.json({ valid: true })
        } else {
            res.status(401).json({ message: "Missing token" })
        }
    } catch (error) {
        res.status(403).json({ valid: false })
    }
})

connect().then(() => {
    const port = process.env.PORT;
    app.listen(port, () => { console.log("server running on port: " + port) })
}).catch((err) => {
    console.error(err.message)
})