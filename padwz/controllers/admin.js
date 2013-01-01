var fs = require('fs');
var path = require('path');
var sanitize = require('validator').sanitize;
var config = require('../config').config;
var models = require('../models');
var Site = models.Site;

// 显示后台管理页面
exports.showAdmin = function(req, res) {
    res.render('admin/admin');
};

// 显示网站管理页面
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

// 显示网站添加页面
exports.showSiteAdd = function(req, res) {
    res.render('admin/site_add');
};

// 网站添加
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

    fs.exists(savepath,function(exists){
        if(exists){
            return res.render('admin/site_add', {
                error: '图片已存在，请重新上传'
            });
        }
        else{
            fs.rename(img.path, savepath, function (err) {
                if (err) {
                    return next(err);
                }

                var site = new Site();
                site.title = title;
                site.url = url;
                site.img = '/assets/upload/'+ filename;
                site.imgname = filename;
                site.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/site_set');
                });
            });
        }
    });
};

// 网站删除
exports.siteDel = function(req, res, next){
    var site_id = req.params.sid;

    if (!req.session.user) {
        return res.redirect('home');
    }

    if (site_id.length !== 24) {
        return res.render('admin/site_set',{
            error : '此记录不存在或已被删除。'
        });
    }

    Site.findOne({_id: site_id}, function(err, doc) {
        if (err) return next(err);

        var filepath = path.join(config.upload_dir,doc.imgname);

        doc.remove(function(err){
            if(err){
                return next(err);
            }

            fs.exists(filepath,function(exists){
                if(exists){
                    fs.unlink(filepath,function(err){
                        if(err){
                            return next(err);
                        }

                        return res.redirect('/site_set');
                    });
                }
                else{
                    return res.redirect('/site_set');
                }
            });
        });
    });
}
