define(function(require, exports, module) {

    var HeaderView = require('../views/header');

    var AppRouter = Backbone.Router.extend({
        routes: {
            "" : "index",
            "!/hello" : "hello"
        },

        index : function(){

        },

        hello : function() {
            var headerView = new HeaderView({model: {'msg':"ipad"}});  
            headerView.trigger('change');
        }
    });

    return AppRouter;
});