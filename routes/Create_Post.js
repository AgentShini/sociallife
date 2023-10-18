const express = require("express");
const router = express.Router();

const User = require("../model/usermodel");
const Post = require("../model/scheduledpostmodel");
const Analytics = require("../model/analyticsmodel");

// Get analytics for a user
router.get("/Analytics", async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const analytics = await Analytics.find({ username });
      res.status(200).json({ message: analytics });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get posts for a user
router.get("/Posts", async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const posts = await Post.find({ username });
      res.status(200).json({ message: posts });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete all posts and analytics
router.delete("/All", async (req, res) => {
  try {
    await Post.deleteMany({});
    await Analytics.deleteMany({});
    res.status(200).json({ message: "Data Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get posts by username
router.get("/Posts/:username", (req, res) => {
  const { username } = req.params;
  Post.find({ username }).then((posts) => {
    if (posts.length > 0) {
      res.status(200).json({ message: posts });
    } else {
      res.status(404).json({ error: "No posts found for this username" });
    }
  }).catch((err)=>{
    res.status(500).json({ error: err.message });
  });
});

// Get analytics by username
router.get("/Analytics/:username", (req, res) => {
  const { username } = req.params;
  Analytics.findOne({ username }).then((analytics) => {
    if (analytics) {
      res.status(200).json({ data: analytics });
    } else {
      res.status(404).json({ error: "No analytics found for this username" });
    }
  }).catch((err) => {
    res.status(500).json({ error: err.message });
  });
});

// Create a post and analytics
router.post("/Create", async (req, res) => {
  try {
    const { username, content, platform, engagement, likes_count, retweets_count, comments_count, views_count, clicks_count } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      const createdPost = await Post.create({
        user_id: user._id,
        username,
        content,
        scheduled_time: new Date(),
        social_media_platform: platform,
        likes_count,
        retweets_count,
        comments_count,
        views_count,
        clicks_count,
      });

      const analytics = await Analytics.create({
        post_id: createdPost._id,
        username,
        engagement_type: engagement,
        engagement_timestamp: new Date(),
        user_id: user._id,
        likes_count,
        retweets_count,
        comments_count,
        views_count,
        clicks_count,
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


router.get("/scheduledPosts", (req, res) => {
  // Return all scheduled posts for the user
});

router.put("/editScheduledPost/:postId", (req, res) => {
  // Implement logic to edit a scheduled post by postId
});

router.delete("/deleteScheduledPost/:postId", (req, res) => {
  // Implement logic to delete a scheduled post by postId
});



const checkPostOwnership = (req, res, next) => {
  // Check if the user owns the scheduled post
  if (req.user._id.equals(req.post.user_id)) {
    next(); // User owns the post, proceed
  } else {
    res.status(403).json({ error: 'Permission denied' });
  }
};

module.exports = router;
