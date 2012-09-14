var EventProxy = require('eventproxy').EventProxy;
var sanitize = require('validator').sanitize;
var markdown = require('markdown-js');
var models = require('../models');
var util = require('../libs/util');
var Article = models.Article;

/**
 * 根据id获取文章详情
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
exports.index = function(req, res, next) {
    var article_id = req.params.aid;

    if (article_id.length !== 24) {
        console.log('此话题不存在或已被删除。');
        return;
    }

    var render = function(article, recent_article){
        res.render('article/article', {
            article : article,
            recent_article : recent_article
        });
    }

    var proxy = EventProxy.create('article', 'recent_article', render);

    get_article_by_id(article_id,function(err, data){
        if (err) {
            next(err);
        }

        //格式化时间
        var tempDate = util.format_date(data.update);
        data.publishDate = tempDate;

        proxy.emit('article',data);
    });

    get_full_article(function(err, data){
        if (err) {
            next(err);
        }

        var tempDate = '';

        for(var i=0;i<data.length;i++){
            tempDate = util.format_date(data[i].update);
            data[i].publishDate = tempDate;
        }

        var recent_article = data.slice(0, 5);

        proxy.emit('recent_article',recent_article);
    });
};


/**
 * 显示文章编辑页面
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
exports.showEdit = function(req, res, next){
    var article_id = req.params.aid;

    if (!req.session.user) {
        return res.redirect('home');
    }

    if (article_id.length !== 24) {
        console.log('此话题不存在或已被删除。');
        return;
    }

    get_article_by_id(article_id,function(err, doc){
        if (err) {
            next(err);
        }

        res.render('article/edit', {
            article : doc
        });
    });
}

/**
 * 获取文章编辑内容并保存到数据库
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
exports.edit = function(req, res, next){
    var id = sanitize(req.body.id).trim();
    var title = sanitize(req.body.title).trim();
    var markdownContent = req.body.content;
    var htmlContent = markdown.makeHtml(markdownContent);

    get_article_by_id(id,function(err, doc){
        if (err) {
            next(err);
        }

        doc.title = title;
        doc.content = htmlContent;
        doc.markdown = markdownContent;
        doc.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('home');
        });
    });
}

/**
 * 显示新建文章页面
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
exports.showAdd = function(req, res, next){
    if (!req.session.user) {
        return res.redirect('home');
    }

    res.render('article/add');
}

/**
 * 获取新建文章内容并保存到数据库
 * @param {[type]}   req  [description]
 * @param {[type]}   res  [description]
 * @param {Function} next [description]
 */
exports.add = function(req, res, next){
    if (!req.session.user) {
        return res.redirect('home');
    }

    var tag = req.body.tag;
    var title = sanitize(req.body.title).trim();
    var markdownContent = req.body.content;
    var htmlContent = markdown.makeHtml(markdownContent);

    var article = new Article();
    article.tag = tag;
    article.title = title;
    article.content = htmlContent;
    article.markdown = markdownContent;
    article.save(function (err) {
        if (err) {
            return next(err);
        }
        return res.redirect('home');
    });
}

/**
 * 根据id删除相应的文章
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
exports.del = function(req, res, next){
    var article_id = req.params.aid;

    if (!req.session.user) {
        return res.redirect('home');
    }

    if (article_id.length !== 24) {
        console.log('此话题不存在或已被删除。');
        return;
    }

    get_article_by_id(article_id,function(err, doc){
        if (err) {
            next(err);
        }

        doc.remove(function(err){
            return res.redirect('home');
        })
    });
}

/**
 * 根据标签筛选文章
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
exports.tag = function(req, res, next){
    var tag = req.params.tag;

    var render = function(article, recent_article){
        res.render('index', {
            article : article,
            recent_article : recent_article
        });
    }

    var proxy = EventProxy.create('article', 'recent_article', render);

    get_article_by_tag(tag,function(err, data){
        if (err) {
            next(err);
        }

        for(var i=0;i<data.length;i++){
            tempDate = util.format_date(data[i].update);
            data[i].publishDate = tempDate;
        }

        proxy.emit('article',data);
    });

    get_full_article(function(err, data){
        if (err) {
            next(err);
        }

        var tempDate = '';

        for(var i=0;i<data.length;i++){
            tempDate = util.format_date(data[i].update);
            data[i].publishDate = tempDate;
        }

        var recent_article = data.slice(0, 5);

        proxy.emit('recent_article',recent_article);
    });
}

function get_article_by_id(id, callback) {
    Article.findOne({_id: id}, function(err, doc) {
        if (err) return callback(err);
        callback(null, doc);
    });
}

function get_article_by_tag(tag, callback) {
    Article.find({tag: tag}, function(err, doc) {
        if (err) return callback(err);
        callback(null, doc);
    });
}

function get_full_article(callback) {
    Article.find({},null,{sort:[['update','desc']]},function(err, doc) {
        if (err) return callback(err);
        callback(null, doc);
    });
}

exports.get_article_by_id = get_article_by_id;
exports.get_full_article = get_full_article;