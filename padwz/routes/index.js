var site = require('../controllers/site');
var article = require('../controllers/article');
var sign = require('../controllers/sign');

module.exports = function(app) {
    // 首页
    app.get('/', site.index);

    // 文章详情
    app.get('/article/:aid', article.index);

    // 文章编辑
    app.get('/articleedit/:aid', article.showEdit);
    app.post('/articleedit',article.edit);

    // 文章添加
    app.get('/articleadd',article.showAdd);
    app.post('/articleadd',article.add);

    // 文章删除
    app.get('/articledel/:aid',article.del);

    //标签
    app.get('/tag/:tag',article.tag);

    // 账户
    app.get('/signin', sign.showLogin);
    app.post('/signin', sign.login);
    app.get('/signout', sign.signout);
    app.get('/initadmin', sign.showInit);
    app.post('/initadmin', sign.Init);
}