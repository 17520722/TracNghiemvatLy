const mongoose = require('mongoose');

const EvaluatedDocSchema = new mongoose.Schema({
    content: String,
    testId: String
});

module.exports = mongoose.model("EvaluatedDoc", EvaluatedDocSchema);
