const express = require("express");
const router = express.Router();
const User = require("../model/usermodel");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      fullname,
      username,
      followers_count,
      tweets_count,
      location,
      description,
      social_media_accounts, // Array of social media accounts
    } = req.body;

    // Hash the user's password before storing it
    const encrypted = await bcrypt.hash(password, 10);

    const user = new User({
      email: email,
      hash: encrypted,
      fullname: fullname,
      username: username,
      followers_count: followers_count,
      tweets_count: tweets_count,
      location: location,
      description: description,
      social_media_accounts: social_media_accounts, // Include social media accounts
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
