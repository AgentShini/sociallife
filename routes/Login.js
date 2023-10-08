const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/usermodel');
const jwt = require("jsonwebtoken")
const SECRET = require("../env").SECRET_KEY
const DURATION = require("../env").DURATION



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
      const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: DURATION });
      return res.status(200).json({ token });
    } else {
      // Passwords do not match
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/logout', (req, res) => {
  // You can send an expired JWT or an empty token as a response to "logout" the user.
  res.status(200).json({ message: 'Logout successful', token: null });
});



function verifyToken(req, res, next) {
  const token = req.headers.authorization;


  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided'});
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId; // Store the user ID in the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}


router.get('/protected', verifyToken, (req, res) => {
  // You can access the user ID with req.userId
  res.status(200).json({ message: 'Protected route accessed' });
});
module.exports = router;
