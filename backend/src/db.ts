import mongoose, { model, Schema } from "mongoose";

export const connect = async () => {
    const mongoUri = process.env.MONGO;
    if (!mongoUri) {
        throw new Error("Mongo env not defined")
    }
    await mongoose.connect(mongoUri)
}

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String }
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    type: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
})

export const ContentModel = model("Content", ContentSchema);

const TagSchema = new Schema({

})

export const TagModel = model("Tags", TagSchema)


const LinkSchema = new Schema({
    hash: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
})

export const LinkModel = model("Links", LinkSchema)