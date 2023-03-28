import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { Configuration, OpenAIApi } from "openai";

const router = express.Router();
dotenv.config();
// API KEY CONFIGURATION
const configuration = new Configuration({
    apiKey : process.env.OPEN_AI_KEY,
})


// INSTANCE OF OPENAI
const openai = new OpenAIApi(configuration);

router.post("/",async(req,res)=>{
    try{
      const {prompt} = req.body;
    // const prompt = "a man standing near the river banks";  
    const aiRes = await openai.createImage({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json'
      })
      const image = aiRes.data.data[0].b64_json;
      res.status(200).json({photo:image});
    }
    catch(error){
        console.log(error);
        res.status(500).send(error)
    }
})

export default router