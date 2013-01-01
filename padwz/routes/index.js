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
    app.get('/site_set',admin.showSiteSet);
    app.get('/site_add',admin.showSiteAdd);
    app.post('/site_add',admin.siteAdd);
    app.get('/site_del/sid=:sid',admin.siteDel);
}