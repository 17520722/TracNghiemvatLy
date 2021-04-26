const mongoose = require('mongoose');

const AnsweredSchema = new mongoose.Schema({
     questionId: String,
     answerId: String
});

module.exports = mongoose.model("Answered", AnsweredSchema);