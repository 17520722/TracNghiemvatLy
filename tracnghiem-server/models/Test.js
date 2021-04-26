const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
     setOfRemember: [String],
     setOfUnderstand: [String],
     setOfApply: [String],
     setOfAnalyzing: [String],
     levelOfDifficult: Number,
     correctAnsNumber: Number,
     incorrectAnsNumber: Number,
     answerSet: [String],
});

module.exports = mongoose.model("Test", TestSchema);