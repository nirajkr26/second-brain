import express from "express";
import { config } from "dotenv";
config();
import { connect, ContentModel, UserModel } from "./db.js";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import bcrypt from "bcrypt";
const app = express();



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

        const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);

        res.setHeader("Authorization", token);
        res.json({ token });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        res.status(500).json({ message: errorMessage });
    }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type } = req.body;
    await ContentModel.create({
        link,
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


})

app.get("/api/v1/brain/:shareLink", async (req, res) => {

})

connect().then(() => {
    const port = process.env.PORT;
    app.listen(port, () => { console.log("server running on port: " + port) })
}).catch((err) => {
    console.error(err.message)
})