const express = require("express");
const router = express.Router();

const User = require("../model/usermodel");
const Post = require("../model/postmodel");
const Analytics = require("../model/analyticsmodel");


// Create a post and analytics
router.post("/Create", async (req, res) => {
  try {
    const { username, content, platform} = req.body;
    const user = await User.findOne({ username });

    if (user) {
      const createdPost = await Post.create({
        user_id: user._id,
        username,
        content,
        social_media_platform: platform
      });

      const analytics = await Analytics.create({
        post_id: createdPost._id,
        username,
        user_id: user._id,
      });

      return res.status(201).json({ message: "Post created successfully", post: createdPost, analytics });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
