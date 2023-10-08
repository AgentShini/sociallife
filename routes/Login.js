const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/usermodel'); // Assuming you have a User model defined

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.hash);

    if (isMatch) {
      // Passwords match, user is authenticated
      return res.status(200).json({ message: 'Authentication successful' });
    } else {
      // Passwords do not match
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
