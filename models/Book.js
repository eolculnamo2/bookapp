var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = new Schema({
    title: String,
    author: String,
    year: String,
    read: Boolean,
    categories: Array,
    tags: Array,
    recommendedBy: String,
    amazonURL: String,
    audibleURL: String,
    rating: Number
});
