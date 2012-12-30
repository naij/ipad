var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var SiteSchema = new Schema({
    title: { type: String },
    url: { type: String },
    img: { type: String },
	tag: { type: String }
});

mongoose.model('site', SiteSchema, 'site');