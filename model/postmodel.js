const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: { type: String, ref: 'User', required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  social_media_platform: { type: String, required: true },
  analytics_id: { type: String, ref: 'Analytics', default: 'NULL' },
  likes_count: { type: Number, default: 0 },   // Add likes count field
  retweets_count: { type: Number, default: 0 }, // Add retweets count field
  comments_count: { type: Number, default: 0 }, // Add comments count field
  views_count: { type: Number, default: 0 },    // Add views count field
  engagement: { type: Number , default: 0 },            // Add engagement type field
});

module.exports = mongoose.model('Post', PostSchema);
