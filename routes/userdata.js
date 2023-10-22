const express = require("express");
const router = express.Router();

const User = require("../model/usermodel");
const Post = require("../model/postmodel");
const Analytics = require("../model/analyticsmodel");
const ScheduledPost = require("../model/scheduledpostmodel");

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

router.get("/Analytics/:id", async (req, res) => {
  const { username,id } = req.query;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const analytics = await Analytics.find({ username,id });
      res.status(200).json({ message: analytics });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/scheduledPosts", async(req, res) => {
    const {username} = req.query;
    try {
        const user = await User.findOne({ username });
        if (user) {
          const scheduledPost = await ScheduledPost.find({ username });
          res.status(200).json({ message: scheduledPost});
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
