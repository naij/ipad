var site = require('../controllers/site');
var sign = require('../controllers/sign');
var admin = require('../controllers/admin');

module.exports = function(app) {
    // 首页
    app.get('/', site.index);

    // 账户
    app.get('/signin', sign.showLogin);
    app.post('/signin', sign.login);
    app.get('/signout', sign.signout);
    app.get('/initadmin', sign.showInit);
    app.post('/initadmin', sign.Init);

    // 后台
    app.get('/admin', admin.showAdmin);
    app.get('/site_manage',admin.showSiteManage);
    app.get('/site_add',admin.showSiteAdd);
    app.post('/site_add',admin.siteAdd);
    app.get('/site_edit/sid=:sid',admin.showSiteEdit);
    app.post('/site_edit',admin.siteEdit);
    app.get('/site_del/sid=:sid',admin.siteDel);
    app.get('/site_tag_manage',admin.showSiteTagManage);
    app.get('/site_tag_add',admin.showSiteTagAdd);
    app.post('/site_tag_add',admin.siteTagAdd);
    app.get('/site_tag_del/tid=:tid',admin.siteTagDel);
}