var sanitize = require('validator').sanitize;
var models = require('../models');
var site = models.site;

// Show admin page.
exports.showAdmin = function(req, res) {
    res.render('admin/admin');
};

// Show site set page.
exports.showSiteSet = function(req, res) {
    res.render('admin/site_set');
};

// Show site add page.
exports.showSiteAdd = function(req, res) {
    res.render('admin/site_add');
};

// site add
exports.siteAdd = function(req, res) {
    var title = sanitize(req.body.name).trim();
    var url = sanitize(req.body.pass).trim();
    
};