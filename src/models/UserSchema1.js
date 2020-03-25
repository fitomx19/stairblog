const mongoose = require('mongoose');
const { Schema } = mongoose;

var UserSchema1 = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number
});

module.exports = mongoose.model('User1', UserSchema1);