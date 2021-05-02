const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
     topicId: String,
     content: String
});

module.exports = mongoose.model("Topic", TopicSchema);