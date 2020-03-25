 const mongoose = require('mongoose');
const { Schema } = mongoose;
var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');


const PostSchema = new Schema({
   
    title: { type: String, required: true ,trim: true,},
    description: { type: String, required: true, trim: true, },
    content: { type: String, required: true, trim: true,},
    image: { type: String, default: "http://placehold.it/750x300"},
    date: { type: Date, default: Date.now }
   

});
PostSchema.plugin(mongoose_fuzzy_searching, { fields: ['title', 'content'] });
module.exports = mongoose.model('Post', PostSchema) 
 
 