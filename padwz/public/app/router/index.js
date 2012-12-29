define(function(require, exports, module) {
    var Backbone = require('backbone');

    var AppRouter = Backbone.Router.extend({
        routes: {
            "" : "index",
            "!/app" : "app"
        },

        index : function(){
            var SiteView = require('../views/site');
            var siteView = new SiteView();
            SiteView = null;
            siteView = null;
        },

        app : function() {
            var AppView = require('../views/app');
            var appView = new AppView();
            AppView = null;
            appView = null;
        }
    });

    return AppRouter;
});