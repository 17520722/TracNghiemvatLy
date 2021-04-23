const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    content: String,
    setOfAnswer: [{type: String}],
    level: Number,
    topic: String
});

module.exports = mongoose.model("Question", QuestionSchema);
