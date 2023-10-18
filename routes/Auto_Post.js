const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');

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
  // Replace this with actual code to post a tweet using the Twitter API or other social media APIs
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
