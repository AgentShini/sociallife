const express = require('express');
const router = express.Router();
const User = require("../model/usermodel");
const Post = require("../model/postmodel");
const Analytics = require("../model/analyticsmodel");


// Create a route to trigger automated posting
router.post('/create_post', async(req, res) => {
    const {
        username,
        content
        } = req.body;
        const user = await User.findOne({username})
        if(user){

          if (user) {
            // First, create the Analytics document
            const analytics = await Analytics.create({
              post_id: null, // You'll update this later
              username: user.username,
              user_id: user._id,
            });
          
            // Now, use the _id of the created Analytics document to create the Post
            const post = await Post.create({
              user_id: user._id, // Use user._id for user_id in the Post document
              username: user.username,
              content: content,
              analytics_id: analytics._id, // Use the _id from the created Analytics document
            });
          
            // Update the post_id in the Analytics document with the _id of the created Post
            analytics.post_id = post._id;
            await analytics.save();
          }
          
            
        }else{
          res.status(404).json({message:'User not Found'})
        }
 
  res.status(200).json({ message: 'Tweet Posted.' });
});



module.exports = router;
