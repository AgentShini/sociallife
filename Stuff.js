const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const Twit = require('twit'); // Import the twit library

const User = require('../model/usermodel');
const Post = require('../model/postmodel');
const Analytics = require('../model/analyticsmodel');
const ScheduledPost = require('../model/scheduledpostmodel');

// Initialize the Twitter API client with your API keys and access tokens
const T = new Twit({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  access_token: 'YOUR_ACCESS_TOKEN',
  access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET',
});

// Create a route to trigger automated posting
router.post('/schedule-posts', (req, res) => {
  const { username, content, time } = req.body;

  if (!content || !time) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  // Schedule automated posting based on the provided time
  const scheduledTime = new Date(time);

  // Schedule the job to post the provided content at the specified time
  schedule.scheduleJob(scheduledTime, function () {
    // Use the Twitter API to post the content
    T.post('statuses/update', { status: content }, (err, data, response) => {
      if (err) {
        console.error('Error posting to Twitter:', err);
      } else {
        console.log('Posted to Twitter:', content);
      }
    });
  });

  res.status(200).json({ message: 'Automated posting scheduled.' });
});

module.exports = router;
