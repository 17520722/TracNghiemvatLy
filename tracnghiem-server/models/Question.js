const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    content: String,
    setOfAnswer: [{
        content: String,
        isCorrect: Boolean
    }],
    level: Number,
    topic: String
});

module.exports = mongoose.model("Question", QuestionSchema);
