const express = require('express');
const router = express.Router();
const axios = require('axios');

// Replace actual Twitter API URLs with your mock API URLs
const mockApiBaseUrl = 'http://localhost:3000/api/twitter'; // Assuming you run the mock Twitter API on port 3000

router.get('/Analytics', async (req, res) => {
  const { username } = req.query;
  try {
    const userResponse = await axios.get(`${mockApiBaseUrl}/users`);
    const user = userResponse.data.find((user) => user.username === username);

    if (user) {
      const analyticsResponse = await axios.get(`${mockApiBaseUrl}/analytics/${username}`);
      res.status(200).json({ message: analyticsResponse.data });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/Users', async (req, res) => {
  try {
    const usersResponse = await axios.get(`${mockApiBaseUrl}/users`);
    res.status(200).json({ users: usersResponse.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/Tweets/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const userResponse = await axios.get(`${mockApiBaseUrl}/users`);
    const user = userResponse.data.find((user) => user.username === username);

    if (user) {
      const tweetsResponse = await axios.get(`${mockApiBaseUrl}/posts/${username}`);
      res.status(200).json({ tweets: tweetsResponse.data });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
