const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswerSchema = new Schema({
    name: { type: String, required: true },
    commentary: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: String },
    id_comentario: { type: String }

});

module.exports = mongoose.model('Answer', AnswerSchema)

