const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
     content: String,
     isCorrect: Boolean,
     id: String
});

module.exports = mongoose.model("Answer", AnswerSchema);
