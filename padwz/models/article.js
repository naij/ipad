var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ArticleSchema = new Schema({
	tag : {type: String},
    title: { type: String },
    content: { type: String },
    markdown : {type: String},
    update : { type: Date, default: Date.now }
});

mongoose.model('article', ArticleSchema, 'article');
