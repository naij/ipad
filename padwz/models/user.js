var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var UserSchema = new Schema({
    name: { type: String, index: true },
    loginname: { type: String, unique: true },
    pass: { type: String }
});

mongoose.model('User', UserSchema, 'user');