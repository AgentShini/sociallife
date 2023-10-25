const express = require('express');
const router = express.Router();
const User = require('../model/usermodel');
const Post = require('../model/postmodel');
const Analytics = require('../model/analyticsmodel');
const schedule = require('node-schedule');

// Create a route to trigger automated posting
router.post('/schedule_post', async (req, res) => {
  try {
    const { username, content, time } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create an Analytics document
    const analytics = await Analytics.create({
      post_id: null,
      username: user.username,
      user_id: user._id,
    });

    // Create a Post document
    const post = await Post.create({
      user_id: user._id,
      username: user.username,
      content: content,
      analytics_id: analytics._id,
    });

    // Update the post_id in the Analytics document
    analytics.post_id = post._id;
    await analytics.save();

    // Schedule the post based on the provided time
    schedule.scheduleJob(time, function () {
      console.log(`Automated post for ${user.username} at ${time}: ${content}`);
      // You can add the logic to post to a social media platform here
    });

    res.status(200).json({ message: 'Automated posting scheduled.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
