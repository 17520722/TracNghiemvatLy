const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    content: String,
    setOfAnswer: [{
        content: String,
        isCorrect: Boolean
    }],
    image: String,
    level: Number,
    correctAns: Number,
    countAns: Number,
    topic: String
});

module.exports = mongoose.model("Question", QuestionSchema);
