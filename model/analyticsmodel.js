const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyticsDataSchema = new Schema({
  post_id: { type: String, ref: 'Post', required: true },
  engagement_type: { type: String, required: true },
  engagement_timestamp: { type: Date, required: true },
  user_id: { type: String, ref: 'User' },
});

module.exports = mongoose.model("Analytics",analyticsDataSchema)