const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
     username: String,
     role: String,
     email: String,
     info: String,
     hashPassword: String,
     refreshToken: String,
     listOfTest: [],
     listOfEvaluatedDoc: []
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
     return bcrypt.compareSync(password, hashPassword);
}

module.exports = mongoose.model("User", UserSchema);