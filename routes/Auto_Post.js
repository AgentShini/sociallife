const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');

const User = require("../model/usermodel");
const Post = require("../model/postmodel");
const Analytics = require("../model/analyticsmodel");
const ScheduledPost = require("../model/scheduledpostmodel");

// Create an array of tweets to post
const tweetsToPost = [
  "Good morning, everyone!",
  "Just posted a new blog article. Check it out!",
  "Enjoying a great day at the park. #relaxing",
];

// Schedule tweets to be posted every day at specific times (e.g., 9 AM, 1 PM, 5 PM)
const postingTimes = [
  { hour: 9, minute: 0 },
  { hour: 13, minute: 0 },
  { hour: 17, minute: 0 },
];

// Post tweets function
async function postTweet(tweet) {
 const {
  userid,
  content,
  platform,
  analyticid,
    email,
    password,
    fullname,
    username,
    location,
    social_media_accounts, // Array of social media accounts
  } = req.body;
  console.log(`Posted tweet: ${tweet}`);
}

// Create a route to trigger automated posting
router.post('/schedule-posts', (req, res) => {
  // Schedule the tweets to be posted
  postingTimes.forEach((time, index) => {
    schedule.scheduleJob(time, function () {
      postTweet(tweetsToPost[index]);
    });
  });

  res.status(200).json({ message: 'Automated posting scheduled.' });
});



module.exports = router;
