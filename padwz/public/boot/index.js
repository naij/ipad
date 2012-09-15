define(function(require, exports, module) {

    var Router = require('../app/router/index');
    new Router();

    // 启动程序
    Backbone.history.start();

});