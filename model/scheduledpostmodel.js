const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduledPostSchema = new Schema({
  user_id: { type: String, ref: 'User', required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  scheduled_time: { type: Date, required: true },
  social_media_platform: { type: String, required: true },
  status: {
    type: String,
    enum: ['scheduled', 'published', 'failed'],
    default: 'scheduled',
  },
  analytics_id: { type: String, ref: 'Analytics', default: 'NULL' },
  likes_count: { type: Number, default: 0 },   // Add likes count field
  retweets_count: { type: Number, default: 0 }, // Add retweets count field
  comments_count: { type: Number, default: 0 }, // Add comments count field
  views_count: { type: Number, default: 0 },    // Add views count field
  engagement_type: { type: String },            // Add engagement type field
});

module.exports = mongoose.model('ScheduledPost', scheduledPostSchema);
