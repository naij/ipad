var site = require('../controllers/site');
//var sign = require('../controllers/sign');

module.exports = function(app) {
    // 首页
    app.get('/', site.index);

    // 账户
    // app.get('/signin', sign.showLogin);
    // app.post('/signin', sign.login);
    // app.get('/signout', sign.signout);
    // app.get('/initadmin', sign.showInit);
    // app.post('/initadmin', sign.Init);
}