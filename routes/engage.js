const express = require('express');
const router = express.Router();
const User = require("../model/usermodel");
const Post = require("../model/postmodel");
const Analytics = require("../model/analyticsmodel");

  router.post('/engage/like',async(req,res)=>{
    try {
      const{ post_id } = req.body;
      // Find the post by post_id
      const post = await Post.findById(post_id);
  
      if (!post) {
       return res.status(201).json({message:'Post not Found'});
      }
  
      // Increment likes_count, views_count, and engagement on the post
      post.likes_count++;
      post.engagement++;
  
      // Save the updated post
      await post.save();
  
      // Find and update the analytics record for the like
      const analytics = await Analytics.findOne({ post_id: post_id });
  
      if (analytics) {
        // Update the existing analytics data
        analytics.likes_count++;
        analytics.engagement++;
        // Save the updated analytics record
        await analytics.save();
        console.log('Liked the post:', post_id);
        res.status(200).json({ message: 'Tweet Liked.' });

      } else {
        console.error('Analytics not found');
      }
    } catch (error) {
      console.error(error);
      res.status(201).json({ message: 'Error.' });

    }
  })

  router.post('/engage/retweet',async(req,res)=>{
    try {
       const{ post_id } = req.body;
      // Find the post by post_id
      const post = await Post.findById(post_id);
  
      if (!post) {
       return res.status(201).json({message:'Post not Found'});
      }
  
      // Increment likes_count, views_count, and engagement on the post
      post.retweets_count++;
      post.engagement++;
  
      // Save the updated post
      await post.save();
  
      // Find and update the analytics record for the like
      const analytics = await Analytics.findOne({ post_id: post_id });
  
      if (analytics) {
        // Update the existing analytics data
        analytics.retweets_count++;
        analytics.engagement++;
        // Save the updated analytics record
        await analytics.save();
        console.log('Retweeted the post:', post_id);
        res.status(200).json({ message: 'Tweet Retweeted.' });

      } else {
        console.error('Analytics not found');
      }
    } catch (error) {
      console.error(error);
      res.status(201).json({ message: 'Error.' });

    }
  })

  router.post('/engage/comment',async(req,res)=>{
  
    try {
      const{ post_id } = req.body;
      // Find the post by post_id
      const post = await Post.findById(post_id);
  
      if (!post) {
       return res.status(201).json({message:'Post not Found'});
      }
  
      // Increment likes_count, views_count, and engagement on the post
      post.comments_count++;
      post.engagement++;
  
      // Save the updated post
      await post.save();
  
      // Find and update the analytics record for the like
      const analytics = await Analytics.findOne({ post_id: post_id });
  
      if (analytics) {
        // Update the existing analytics data
        analytics.comments_count++;
        analytics.engagement++;
        // Save the updated analytics record
        await analytics.save();
        console.log('Commented on the post:', post_id);
        res.status(200).json({ message: 'Tweet Commented.' });

      } else {
        console.error('Analytics not found');
      }
    } catch (error) {
      console.error(error);
      res.status(201).json({ message: 'Error.' });

    }
  })

  router.get('/engage/view',async(req,res)=>{
  
    try {
      const{ post_id } = req.body;
      // Find the post by post_id
      const post = await Post.findById(post_id);
      const content = post.content;
    
      if (!post) {
        res.status(201).json({message:'Post not Found'});
      }
    
      // Increment likes_count, views_count, and engagement on the post
      post.views_count++;
      post.engagement++;
    
      // Save the updated post
      await post.save();
    
      // Find and update the analytics record for the like
      const analytics = await Analytics.findOne({ post_id: post_id });
    
      if (analytics) {
        // Update the existing analytics data
        analytics.views_count++;
        analytics.engagement++;
        await analytics.save();
    
        console.log('Viewed the post:', post_id);
        res.status(200).json({Post:content});
      } else {
        console.error('Analytics not found');
      }
    } catch (error) {
      console.error(error);
    }
  })








module.exports = router;
  