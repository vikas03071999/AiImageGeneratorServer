import express from "express"
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import Post from '../mongodb/models/post.js'

dotenv.config();
const router = express.Router();

// CLOUDINARY CONFIGURATION TO UPLOAD IMAGES
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



router.get("/", async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json({success: true, data: posts})
    }
    catch(error){
        res.status(501).json({success: false, data: error})
    }
})

router.post("/", async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = new Post({
            name,
            prompt,
            photo: photoUrl.url
        })
        const postCreated = await newPost.save();
        res.status(201).json({ success: true, data: postCreated });
    }
    catch(error){
        res.status(500).send(error);
    }
})

export default router