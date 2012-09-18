seajs.config({
  	preload: ['seajs/plugin-text']
});

seajs.use(['/app/router/index','/app/views/layout'], function(Router,Init) {

	// 初始化页面框架
	new Init();

	new Router();

    // 启动程序
    Backbone.history.start();

});