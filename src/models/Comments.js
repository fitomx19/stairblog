const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    name: { type: Object, required: true },
    description: { type: Object, required: true },
    commentary: { type: Object, required:true},
    date: { type: Date, default: Date.now },
    user: { type: Object },
    id: { type: Object } , //id del post,
    reply: { type: Object,  default: 0}, // comentario de reply
    id_usr: { type: Object}  // id de la persona que comenta


});

module.exports = mongoose.model('Comment', CommentSchema)

