const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    commentary: {type: String, required:true},
    date: { type: Date, default: Date.now },
    user: { type: String },
    id: { type: String }

});

module.exports = mongoose.model('Comment', CommentSchema)

