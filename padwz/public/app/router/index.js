define(function(require, exports, module) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "" : "index",
            "!/app" : "app",
            "!/search" : "search"
        },

        index : function(){
            var SidebarView = require('../views/sidebar.js#');
            var sidebarView = new SidebarView();

            var SiteView = require('../views/site.js#');
            var siteView = new SiteView();
        },

        app : function() {
            var SidebarView = require('../views/sidebar.js#');
            var sidebarView = new SidebarView();

            var AppView = require('../views/app.js#');
            var appView = new AppView();
        },

        search : function(){
            var SidebarView = require('../views/sidebar.js#');
            var sidebarView = new SidebarView();

            var SearchView = require('../views/search.js#');
            var searchView = new SearchView();
        }
    });

    return AppRouter;
});