const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduledPostSchema = new Schema({
  user_id: { type: String, ref: 'User', required: true },
  content: { type: String, required: true },
  scheduled_time: { type: Date, required: true },
  social_media_platform: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'published', 'failed'], default: 'scheduled' },
  analytics_id: { type: String, ref: 'Analytics' },
});

module.exports = mongoose.model("ScheduledPost",scheduledPostSchema)