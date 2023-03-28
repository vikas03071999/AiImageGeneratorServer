import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectToDb from "./mongodb/connectToDb.js";
import postRouter from "./routes/postRoutes.js";
import dalleRouter from "./routes/dalleAiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));


app.use("/api/openai/imageGeneration",dalleRouter);
app.use("/api/posts/postRoute",postRouter);

const startServer = async() => {
    app.listen(8081, () => {
        console.log("Server is ready")
    })
    connectToDb(process.env.MONGO_URL);
}

startServer();