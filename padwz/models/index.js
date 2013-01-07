var mongoose = require('mongoose');
var config = require('../config').config;
var db = config.db();

mongoose.connect(db, function (err) {
    if (err) {
        console.error('connect to %s error: ', db, err.message);
        process.exit(1);
    }
    else{
        console.log('connect to "%s" success', db);
    }
});

// models
require('./user');
require('./site');
require('./site_tag');

exports.User = mongoose.model('user');
exports.Site = mongoose.model('site');
exports.SiteTag = mongoose.model('site_tag');
