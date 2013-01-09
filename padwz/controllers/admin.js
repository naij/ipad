var fs = require('fs');
var path = require('path');
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy').EventProxy;
var config = require('../config').config;
var models = require('../models');
var Site = models.Site;
var SiteTag = models.SiteTag;

// 显示后台管理页面
exports.showAdmin = function(req, res) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    res.render('admin/admin');
};

// 显示网站管理页面
exports.showSiteManage = function(req, res) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tag_id = req.query.tid;
    var proxy = new EventProxy();

    var done = function(site, tags){
        res.render('admin/site/site_manage',{
            tags : tags,
            tag_id : tag_id,
            site : site
        });
    }

    proxy.assign('site_query', 'tag_query', done);

    if(tag_id){
        Site.find({tag: tag_id},function(err,doc){
            if (err) {
                return next(err);
            }

            proxy.trigger('site_query',doc);
        });

        SiteTag.find(function(err, doc) {
            if (err) {
                return next(err);
            }

            proxy.trigger('tag_query',doc);
        });
    }
    else{
        Site.find(function(err,doc){
            if (err) {
                return next(err);
            }

            proxy.trigger('site_query',doc);
        });

        SiteTag.find(function(err, doc) {
            if (err) {
                return next(err);
            }

            proxy.trigger('tag_query',doc);
        });
    }
};

// 显示网站添加页面
exports.showSiteAdd = function(req, res) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    SiteTag.find(function(err, doc) {
        if (err) {
            return next(err);
        }

        res.render('admin/site/site_add',{
            list : doc
        });
    });
};

// 网站添加
exports.siteAdd = function(req, res) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tag = req.body.tag.split(',')[0];
    var tagname = req.body.tag.split(',')[1];
    var order = sanitize(req.body.order).trim();
    var title = sanitize(req.body.title).trim();
    var url = sanitize(req.body.url).trim();
    var img = req.files && req.files.img;

    if(!order){
        req.flash('error','请输入排序值');
        return res.redirect('/site_add');
    }
    else if(!title){
        req.flash('error','请输入标题');
        return res.redirect('/site_add');
    }
    else if(!url){
        req.flash('error','请输入链接');
        return res.redirect('/site_add');
    }
    else if(!img){
        req.flash('error','请选择要上传的文件');
        return res.redirect('/site_add');
    }

    var filename = img.name;
    var savepath = path.join(config.upload_dir, filename);

    fs.exists(savepath,function(exists){
        if(exists){
            req.flash('error','图片已存在，请重新上传');
            return res.redirect('/site_add');
        }
        else{
            fs.rename(img.path, savepath, function (err) {
                if (err) {
                    return next(err);
                }

                var site = new Site();
                site.tag = tag;
                site.tagname = tagname;
                site.order = order;
                site.title = title;
                site.url = url;
                site.img = '/assets/upload/'+ filename;
                site.imgname = filename;
                site.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/site_manage');
                });
            });
        }
    });
};

// 显示网站编辑页面
exports.showSiteEdit = function(req, res) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var site_id = req.params.sid;
    var proxy = new EventProxy();

    var done = function(site, tags){
        res.render('admin/site/site_edit',{
            tags : tags,
            site : site,
            site_id : site_id
        });
    }

    proxy.assign('site_query', 'tag_query', done);

    Site.find({_id: site_id},function(err,doc){
        if (err) {
            return next(err);
        }

        proxy.trigger('site_query',doc[0]);
    });

    SiteTag.find(function(err, doc) {
        if (err) {
            return next(err);
        }

        proxy.trigger('tag_query',doc);
    });
};

// 网站编辑
exports.siteEdit = function(req, res) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var site_id = req.body.sid;
    var tag = req.body.tag.split(',')[0];
    var tagname = req.body.tag.split(',')[1];
    var order = sanitize(req.body.order).trim();
    var title = sanitize(req.body.title).trim();
    var url = sanitize(req.body.url).trim();

    if(!order){
        req.flash('error','请输入排序值');
        return res.redirect('/site_add');
    }
    else if(!title) {
        req.flash('error','请输入标题');
        return res.redirect('/site_add');
    }
    else if(!url){
        req.flash('error','请输入链接');
        return res.redirect('/site_add');
    }

    Site.update({_id: site_id},{
        tag: tag, 
        tagname: tagname,
        order: order,
        title: title,
        url: url
    },function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/site_manage');
    });
};

// 网站删除
exports.siteDel = function(req, res, next){
    var site_id = req.params.sid;

    if (!req.session.user) {
        return res.redirect('home');
    }

    if (site_id.length !== 24) {
        req.flash('error','此记录不存在或已被删除。');
        return res.redirect('/site_manage');
    }

    siteSingleDel(site_id,function(){
        return res.redirect('/site_manage');
    });
}

// 显示网址标签管理页面
exports.showSiteTagManage = function(req, res, next){
    if (!req.session.user) {
        return res.redirect('home');
    }

    SiteTag.find({},null,null,function(err, doc) {
        if (err) {
            return next(err);
        }

        res.render('admin/site/site_tag_manage',{
            list : doc
        });
    });
}

// 显示网址标签添加页面
exports.showSiteTagAdd = function(req, res, next){
    if (!req.session.user) {
        return res.redirect('home');
    }

    res.render('admin/site/site_tag_add');
}

// 网址标签添加
exports.siteTagAdd = function(req, res) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var name = sanitize(req.body.name).trim();

    if (!name) {
        req.flash('error','请输入标签名字');
        return res.redirect('/site_tag_add');
    }

    var siteTag = new SiteTag();
    siteTag.name = name;
    siteTag.save(function (err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/site_tag_manage');
    });
};

// 网址标签删除
exports.siteTagDel = function(req, res, next){
    var tag_id = req.params.tid;

    if (!req.session.user) {
        return res.redirect('home');
    }

    if (tag_id.length !== 24) {
        req.flash('error','此记录不存在或已被删除。');
        return res.redirect('/site_manage');
    }

    var proxy = new EventProxy();

    var done = function(){
        return res.redirect('/site_tag_manage');
    }

    proxy.assign('tag_removed', 'site_removed', done);

    SiteTag.remove({_id: tag_id}, function(err){
        if(err){
            return next(err);
        }
        proxy.trigger('tag_removed');
    });

    Site.update({tag: tag_id}, {
        tag: '',
        tagname: ''
    }, function(err){
        if(err){
            return next(err);
        }
        proxy.trigger('site_removed');
    });
}

function siteSingleDel(site_id,callback){
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
                        callback();
                    });
                }
                else{
                    callback();
                }
            });
        });
    });
}
