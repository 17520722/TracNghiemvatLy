const mongoose = require('mongoose');

const AbilitySchema = new mongoose.Schema({
     topicId: String,
     ability: String,
     userId: String,
});

module.exports = mongoose.model("Ability", AbilitySchema);