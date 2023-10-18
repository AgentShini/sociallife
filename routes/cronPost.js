const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const Post = require('../model/scheduledpostmodel');
const User = require('../model/usermodel');

// Define the cron job function
const runCronJob = async () => {
  try {
    const user = await User.findOne({ username: 'username_here' }); // Replace 'username_here' with the target username

    if (!user) {
      console.error('User not found');
      return;
    }

    const newPost = new Post({
      user_id: user._id,
      username: user.username,
      content: 'Your post content here',
      scheduled_time: new Date(),
      social_media_platform: 'platform_here',
    });

    const savedPost = await newPost.save();

    // Create a new Analytics document and associate it with the post
    const newAnalytics = new Analytics({
      post_id: savedPost._id,
      username: user.username,
      engagement_type: 'like', // Set the desired engagement type
      engagement_timestamp: new Date(),
      user_id: user._id,
      likes_count: 10, // Set the desired value
      retweets_count: 5, // Set the desired value
      comments_count: 2, // Set the desired value
      views_count: 100, // Set the desired value
      clicks_count: 0, // You can set this as needed
    });

    const savedAnalytics = await newAnalytics.save();

    savedPost.status = 'published';
    // Update the fields on the post
    savedPost.likes_count = savedAnalytics.likes_count;
    savedPost.retweets_count = savedAnalytics.retweets_count;
    savedPost.comments_count = savedAnalytics.comments_count;
    savedPost.views_count = savedAnalytics.views_count;
    savedPost.engagement_type = savedAnalytics.engagement_type;
    

    // Save the updated post
    await savedPost.save();
    
    console.log('Post created, Analytics created, and fields updated successfully');
  } catch (error) {
    console.error(error);
  }
};


const emulateLike = async (postId, userId) => {
  try {
    // Find the Analytics data associated with the postId
    const analytics = await Analytics.findOne({ post_id: postId });
    
    if (!analytics) {
      console.error('Analytics not found for the post');
      return;
    }

    // Perform the "like" engagement action
    // In a real application, you would handle the like logic accordingly

    // Update the Analytics data
    analytics.engagement_type = 'like';
    analytics.engagement_timestamp = new Date();
    analytics.user_id = userId;
    analytics.likes_count++; // Increase the likes count
    analytics.retweets_count++;
    analytics.comments_count++;
    analytics.views_count++;
    analytics.clicks_count++;
   // custom_metric


    // Save the updated Analytics data
   const SavedAnalytics = await analytics.save();

    // Update the corresponding Post data
    // Assuming you have the postId available
    const post = await Post.findById(postId);
    if (!post) {
      console.error('Post not found');
      return;
    }

    // Update the Post data
    post.engagement_type = SavedAnalytics.engagement_type
    post.likes_count = SavedAnalytics.likes_count; // Increase the likes count
    post.retweets_count = SavedAnalytics.retweets_count;
    post.comments_count = SavedAnalytics.comments_count;
    post.views_count = SavedAnalytics.views_count;// Increase the likes count on the post
    post.analytics_id = SavedAnalytics._id; // Set the analytics_id to the updated Analytics data

    // Save the updated Post data
    await post.save();

    console.log('Like action performed and data updated successfully');
  } catch (error) {
    console.error(error);
  }
};



// Define your /create route to trigger the cron job
router.post('/create', (req, res) => {
  // Trigger the cron job when visiting the /create route
  runCronJob();
  res.status(200).json({ message: 'Post creation scheduled successfully' });
});

module.exports = router;
