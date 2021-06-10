const mongoose = require('mongoose');

const TopicEvaluateSchema = new mongoose.Schema({
    username: String,
    topicId: String,
    NLScore: Number
});

module.exports = mongoose.model("TopicEvaluate", TopicEvaluateSchema);
