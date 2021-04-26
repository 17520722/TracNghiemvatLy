const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    content: String,
    setOfAnswerId: [{type: String}],
    setOfAnswer: [{type: String}],
    level: Number,
    topicId: String,
    topic: String
});

module.exports = mongoose.model("Question", QuestionSchema);
