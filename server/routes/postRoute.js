const router = require("express").Router();
const Post = require("../Models/Post");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//GET ALL POST
router.get('/', async (req, res)=>{
    try {
        const posts = await Post.find({});

        res.status(201).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
})


//CREATE A POST
router.post('/', async (req, res)=>{
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
})


module.exports = router