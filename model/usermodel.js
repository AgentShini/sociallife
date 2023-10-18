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
  location: { type: String },
  social_media_accounts: [socialMediaAccountSchema], // Array of social media accounts
  subscription_status: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free',
  },
  subscription_plan: {
    type: String,
    default: null, // Store the selected subscription plan for premium users
  },
  subscription_expiry_date: {
    type: Date,
    default: null, // Store the subscription expiration date for premium users
  }
});

module.exports = mongoose.model("Users", userSchema);
