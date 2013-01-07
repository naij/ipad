var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var TagSchema = new Schema({
    name: { type: String },
    order: { type: Number }
});

mongoose.model('site_tag', TagSchema, 'site_tag');