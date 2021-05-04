const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
     content: String,
     isCorrect: Boolean
});

module.exports = mongoose.model("Answer", AnswerSchema);
