var site = require('../controllers/site');
var sign = require('../controllers/sign');
var admin = require('../controllers/admin');
var admin_site = require('../controllers/admin_site');

module.exports = function(app) {
    // 首页
    app.get('/', site.index);

    // 网址
    app.get('/site/list', site.list);

    // 账户
    app.get('/signin', sign.showLogin);
    app.post('/signin', sign.login);
    app.get('/signout', sign.signout);
    app.get('/initadmin', sign.showInit);
    app.post('/initadmin', sign.Init);

    // 后台
    app.get('/admin', admin.showAdmin);

    // 后台-网站管理
    app.get('/site_manage/:tid',admin_site.showSiteManage);
    app.get('/site_add/:tid',admin_site.showSiteAdd);
    app.post('/site_add',admin_site.siteAdd);
    app.get('/site_edit/:tid/:sid',admin_site.showSiteEdit);
    app.post('/site_edit',admin_site.siteEdit);
    app.get('/site_del/:tid/:sid',admin_site.siteDel);
    app.get('/site_tag_manage',admin_site.showSiteTagManage);
    app.get('/site_tag_add',admin_site.showSiteTagAdd);
    app.post('/site_tag_add',admin_site.siteTagAdd);
    app.get('/site_tag_edit/:tid',admin_site.showSiteTagEdit);
    app.post('/site_tag_edit',admin_site.siteTagEdit);
    app.get('/site_tag_del/:tid',admin_site.siteTagDel);
}