seajs.config({
  	preload: ['seajs/plugin-text']
});

seajs.use(['/app/router/index'], function(Router) {

	new Router();

    // 启动程序
    Backbone.history.start();

});