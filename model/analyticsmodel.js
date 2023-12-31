const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyticsDataSchema = new Schema({
  post_id: { type: String,default:null },
  username: { type: String, required: true },
  engagement: { type: Number, default: 0 },
  user_id: { type: String, required: true },
  likes_count: { type: Number, default: 0 },       // Likes count
  retweets_count: { type: Number, default: 0 },    // Retweets count
  comments_count: { type: Number, default: 0 },    // Comments count
  views_count: { type: Number, default: 0 },       // Views count
  clicks_count: { type: Number, default: 0 },      // Clicks count
  custom_metric: { type: Number, default: 0 },     // Your custom analytics field
});

module.exports = mongoose.model('Analytics', analyticsDataSchema);
