define(function(require, exports, module) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "" : "index",
            "!/app" : "app",
            "!/search" : "search"
        },

        index : function(){
            var HeaderView = require('../views/header.js#');
            var headerView = new HeaderView();

            var ContentView = require('../views/content.js#');
            var contentView = new ContentView();

            var SidebarView = require('../views/sidebar.js#');
            var sidebarView = new SidebarView();

            var SiterView = require('../views/site.js#');
            var siterView = new SiterView();
        },

        app : function() {
            
        },

        search : function(){

        }
    });

    return AppRouter;
});