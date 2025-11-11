import mongoose from "mongoose";

export const connect = async () => {
    const mongoUri = process.env.MONGO;
    if(!mongoUri){
        throw new Error("Mongo env not defined")
    }
    await mongoose.connect(mongoUri)
}




