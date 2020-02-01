const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true},
    image: { type: String, default: "http://placehold.it/750x300"},
    date: { type: Date, default: Date.now },
    comentarios : {type: String},
    user: { type: String }

});

module.exports = mongoose.model('Post', PostSchema)

