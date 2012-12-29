seajs.config({
    alias: {
        '$' : 'gallery/zepto/1.0.0/zepto',
        'backbone' : 'gallery/backbone/0.9.9/backbone',
        'underscore' : 'gallery/underscore/1.4.2/underscore',
        'class': 'arale/class/1.0.0/class',
        'base': 'arale/base/1.0.1/base'
    },
    preload: ['seajs/plugin-text']
});

seajs.use(['backbone','/app/router/index','/app/views/layout'], function(Backbone,Router,Init) {

    // 初始化页面框架
    new Init();

    new Router();

    // 启动程序
    Backbone.history.start();

});