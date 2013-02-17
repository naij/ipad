var fs = require('fs');
var path = require('path');
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy').EventProxy;
var config = require('../config').config;
var upyun = require('../models/upyun').upyun;
var util = require('../libs/util');
var models = require('../models');
var Site = models.Site;

// 显示网站管理页面
exports.showSiteManage = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tid = req.params.tid;

    Site.findOne({_id: tid},function(err,doc){
        if (err) {
            return next(err);
        }

        res.render('admin/site/site_manage',{
            list : doc
        });
    });
};

// 显示网站添加页面
exports.showSiteAdd = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tid = req.params.tid;

    res.render('admin/site/site_add',{
        tid: tid
    });
};

// 网站添加
exports.siteAdd = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tid = req.body.tid;
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
    var extension = filename.substr(filename.lastIndexOf('.'), filename.length);
    var imgname = util.md5((new Date()).getTime().toString()) + extension;

    console.log(imgname);
    console.log(img);

    var render = function () {
        return res.redirect('/site_manage/' + tid);
    };

    var proxy = new EventProxy();
    proxy.assign('file_upload', 'data_update', render);

    // 上传到又拍云
    upyun.writeFile('/site/' + imgname, fs.readFileSync(img.path), true, function(err, data){
        if (!err) {
            proxy.trigger('file_upload');
        }
    });

    // 保存到数据库
    Site.update({_id: tid},{
        $push:{
            "site":{
                title: title,
                url: url,
                img: '/site/' + imgname,
                order: order
            }
        }
    },function(err){
        if (err) {
            return next(err);
        }

        proxy.trigger('data_update');
    });
};

// 显示网站编辑页面
exports.showSiteEdit = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tid = req.params.tid;
    var sid = req.params.sid;

    Site.findOne({_id: tid},{
        _id: 0,
        site: { 
            $elemMatch: { 
                _id: sid 
            }
        }
    },function(err,doc){
        if (err) {
            return next(err);
        }

        res.render('admin/site/site_edit',{
            site : doc.site[0],
            tid : tid,
            sid : sid
        });
    });
};

// 网站编辑
exports.siteEdit = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tid = req.body.tid;
    var sid = req.body.sid;
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

    Site.update({_id: tid,"site._id": sid},{
        $set: {
            "site.$.order": order,
            "site.$.title": title,
            "site.$.url": url
        }
    },function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/site_manage/' + tid);
    });
};

// 网站删除
exports.siteDel = function(req, res, next){
    var tid = req.params.tid;
    var sid = req.params.sid;

    if (!req.session.user) {
        return res.redirect('home');
    }

    if (sid.length !== 24) {
        req.flash('error','此记录不存在或已被删除。');
        return res.redirect('/site_manage');
    }

    Site.update({_id: tid},{
        $pull: {
            "site": {
                "_id": sid
            }
        }
    },function(err){
        if (err) {
            return next(err);
        }

        return res.redirect('/site_manage/' + tid);
    });
}

// 显示网址标签管理页面
exports.showSiteTagManage = function(req, res, next){
    if (!req.session.user) {
        return res.redirect('home');
    }

    Site.find().sort({order : 1}).exec(function(err, doc) {
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
exports.siteTagAdd = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tag = sanitize(req.body.tag).trim();
    var order = sanitize(req.body.order).trim();

    if (!tag) {
        req.flash('error','请输入标签名字');
        return res.redirect('/site_tag_add');
    }
    else if(!order){
        req.flash('error','请输入标签排序');
        return res.redirect('/site_tag_add');
    }

    var site = new Site();
    site.tag = tag;
    site.order = order;
    site.save(function (err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/site_tag_manage');
    });
};

// 网址标签删除
exports.siteTagDel = function(req, res, next){
    var tid = req.params.tid;

    if (!req.session.user) {
        return res.redirect('home');
    }

    if (tid.length !== 24) {
        req.flash('error','此记录不存在或已被删除。');
        return res.redirect('/site_tag_manage');
    }

    Site.remove({_id: tid}, function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/site_tag_manage');
    });
}

// 显示网址标签编辑页面
exports.showSiteTagEdit = function(req, res, next){
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tid = req.params.tid;

    Site.findOne({_id: tid},function(err,doc){
        if (err) {
            return next(err);
        }

        res.render('admin/site/site_tag_edit',{
            site : doc,
            tid : tid
        });
    });
}

// 网站标签编辑
exports.siteTagEdit = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tid = req.body.tid;
    var order = sanitize(req.body.order).trim();
    var tag = sanitize(req.body.tag).trim();

    if (!tag) {
        req.flash('error','请输入标签名字');
        return res.redirect('/site_tag_add');
    }
    else if(!order){
        req.flash('error','请输入标签排序');
        return res.redirect('/site_tag_add');
    }

    Site.update({_id: tid},{tag:tag,order:order},function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/site_tag_manage');
    });
};

function siteSingleDel(tid, sid, callback){
    Site.update({_id: tid},{
        $pull: {
            "site": {
                "_id": sid
            }
        }
    },function(err){
        if (err) {
            return next(err);
        }

        callback();
    });

    // Site.findOne({_id: site_id}, function(err, doc) {
    //     if (err) return next(err);

    //     var filepath = path.join(config.upload_dir,doc.imgname);

    //     doc.remove(function(err){
    //         if(err){
    //             return next(err);
    //         }

    //         fs.exists(filepath,function(exists){
    //             if(exists){
    //                 fs.unlink(filepath,function(err){
    //                     if(err){
    //                         return next(err);
    //                     }
    //                     callback();
    //                 });
    //             }
    //             else{
    //                 callback();
    //             }
    //         });
    //     });
    // });
}
