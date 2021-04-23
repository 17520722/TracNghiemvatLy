const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
     content: String
});

module.exports = mongoose.model("Topic", TopicSchema);