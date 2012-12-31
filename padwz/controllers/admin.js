var fs = require('fs');
var path = require('path');
var sanitize = require('validator').sanitize;
var config = require('../config').config;
var models = require('../models');
var Site = models.Site;

// Show admin page.
exports.showAdmin = function(req, res) {
    res.render('admin/admin');
};

// Show site set page.
exports.showSiteSet = function(req, res) {
    Site.find({},null,null,function(err, doc) {
        if (err) {
            return next(err);
        }

        res.render('admin/site_set',{
            list : doc
        });
    });
};

// Show site add page.
exports.showSiteAdd = function(req, res) {
    res.render('admin/site_add');
};

// site add
exports.siteAdd = function(req, res) {
    var title = sanitize(req.body.title).trim();
    var url = sanitize(req.body.url).trim();
    var img = req.files && req.files.img;

    if (!title) {
        return res.render('admin/site_add', {
            error: '请输入标题'
        });
    }
    else if(!url){
        return res.render('admin/site_add', {
            error: '请输入链接'
        });
    }
    else if(!img){
        return res.render('admin/site_add', {
            error: '请选择要上传的文件'
        });
    }

    var filename = img.name;
    var savepath = path.join(config.upload_dir, filename);
    fs.rename(img.path, savepath, function (err) {
        if (err) {
            return next(err);
        }
        console.log('file '+ filename +' had be uploaded to ' + config.upload_dir);

        var site = new Site();
        site.title = title;
        site.url = url;
        site.img = '/assets/upload/'+ filename;
        site.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/site_set');
        });
    });
};