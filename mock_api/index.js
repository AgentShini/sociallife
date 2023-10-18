const express = require('express');
const app = express();
const { mockUsers, mockTweets, mockFollowers, mockAnalytics } = require('./twitter_mock');
const { instagramUsers, instagramPosts, instagramAnalytics } = require('./insta_mock');

// Route to get a list of Twitter users
app.get('/api/twitter/users', (req, res) => {
  res.json(mockUsers);
});

// Route to get tweets by username
app.get('/api/twitter/tweets/:username', (req, res) => {
  const { username } = req.params;
  const user = mockUsers.find((user) => user.username === username);
  if (user) {
    const tweets = mockTweets.filter((tweet) => tweet.user_id === user.id);
    res.json(tweets);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Route to get followers by username
app.get('/api/twitter/followers/:username', (req, res) => {
  const { username } = req.params;
  const user = mockUsers.find((user) => user.username === username);
  if (user) {
    const followers = mockFollowers.filter((follower) => follower.user_id === user.id);
    res.json(followers);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Route to get analytics by username
app.get('/api/twitter/analytics/:username', (req, res) => {
  const { username } = req.params;
  const user = mockUsers.find((user) => user.username === username);
  if (user) {
    const analytics = mockAnalytics.filter((analytic) => analytic.user_id === user.id);
    res.json(analytics);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


// Route to get a list of Instagram users
app.get('/api/instagram/users', (req, res) => {
  res.json(instagramUsers);
});

// Route to get Instagram posts by username
app.get('/api/instagram/posts/:username', (req, res) => {
  const { username } = req.params;
  const userPosts = instagramPosts.filter((post) => post.username === username);
  res.json(userPosts);
});

// Route to get Instagram analytics by username
app.get('/api/instagram/analytics/:username', (req, res) => {
  const { username } = req.params;
  const userAnalytics = instagramAnalytics.filter((analytics) => analytics.username === username);
  res.json(userAnalytics);
});

app.listen(3000, () => {
  console.log('Mock Twitter API is running on port 3000');
});



// // Example custom analytics endpoint
// router.get('/api/instagram/custom-analytics/:username', (req, res) => {
//   const { username } = req.params;
//   // Implement logic to calculate custom analytics
//   const customAnalytics = calculateCustomAnalytics(username);
//   res.json(customAnalytics);
// });

// function calculateCustomAnalytics(username) {
//   // Implement custom analytics logic
//   // Calculate and return custom analytics
//   // Example: Calculate average time spent on the user's profile
//   const user = instagramUsers.find((user) => user.username === username);
//   const engagementDuration = user.custom_field_engagement_duration;
//   // Perform calculations...
//   return {
//     username,
//     custom_metric: /* calculated value */,
//   };
// }

