const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialMediaAccountSchema = new Schema({
  platform: { type: String, required: true },
  token: { type: String, required: true },
});

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  followers_count: { type: Number, default: 0 },
  tweets_count: { type: Number, default: 0 },
  location: { type: String },
  description: { type: String },
  social_media_accounts: [socialMediaAccountSchema], // Array of social media accounts
});

module.exports = mongoose.model("Users", userSchema);
