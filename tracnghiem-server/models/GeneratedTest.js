const mongoose = require('mongoose');

const GeneratedTestSchema = new mongoose.Schema({
     numberOfQuestion: Number,
     levelOfDifficult: Number,
     setOfTopic: [String]
});

module.exports = mongoose.model("GeneratedTest", GeneratedTestSchema);
