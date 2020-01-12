const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true},
    image: { type: String },
    date: { type: Date, default: Date.now },
    user: { type: String }

});

module.exports = mongoose.model('Post', PostSchema)

