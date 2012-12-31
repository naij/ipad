var path = require('path');
var ndir = require('ndir');
var config = require('./config').config;
var userDir = path.join(config.upload_dir, '1234');

ndir.mkdir(userDir, function (err) {
    if (err) {
      return next(err);
    }
    console.log('mkdir success');
});