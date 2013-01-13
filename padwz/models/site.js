var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var SiteSchema = new Schema({
    tag: { type:String },
    order: { type: Number },
    site: [
        {
            title: { type: String },
            url: { type: String },
            img: { type: String },
            imgname : { type: String },
            order: { type: Number }
        }
    ]
});

mongoose.model('site', SiteSchema, 'site');