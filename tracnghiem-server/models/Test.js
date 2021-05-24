const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
     setOfRemember: [],
     setOfUnderstand: [],
     setOfApply: [],
     setOfAnalyzing: [],
     levelOfDifficult: Number,
     correctAnsNumber: Number,
     incorrectAnsNumber: Number,
     answerSet: [],
});

module.exports = mongoose.model("Test", TestSchema);