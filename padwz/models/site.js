var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var SiteSchema = new Schema({
    tag: { type:String },
    tagname: { type:String },
    title: { type: String },
    url: { type: String },
    img: { type: String },
    imgname : { type: String },
	tag: { type: String }
});

mongoose.model('site', SiteSchema, 'site');