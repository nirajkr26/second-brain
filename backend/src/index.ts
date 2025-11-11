import express from "express";
import "dotenv";
import { connect } from "./db.js";
const app = express();

app.post("/api/v1/signup", async (req, res) => {

})

app.post("/api/v1/signin", async (req, res) => {

})

app.post("/api/v1/content", async (req, res) => {

})

app.get("/api/v1/content", async (req, res) => {


})

app.delete("/api/v1/content", async (req, res) => {


})

app.post("/api/v1/brain/share", async (req, res) => {


})

app.get("/api/v1/brain/:shareLink", async (req, res) => {

})

connect().then(() => {
    const port = process.env.PORT;
    app.listen(port, () => { console.log("server running on port: " + port) })
}).catch(() => {
    console.error("failed to connect to db")
})