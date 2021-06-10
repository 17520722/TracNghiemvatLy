const mongoose = require('mongoose');

const EvaluatedDocSchema = new mongoose.Schema({
    content: String,
    username: String,
    testId: String,
    topicId: String,
    numberCorrectAns: Number,
    numberAns: Number
});

module.exports = mongoose.model("EvaluatedDoc", EvaluatedDocSchema);
