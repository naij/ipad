define(function(require, exports, module) {

    var sidebarViewTemplate = require('./sidebar.html#');

    var sidebarView = Backbone.View.extend({  
        el: $("#sideBar"),

        template: _.template(sidebarViewTemplate),

        initialize: function(options){
            this.render();
        }, 

        render: function(){
            var hash = location.hash;
            var path = hash.substring(2);

            $(this.el).html(this.template({path:path}));
        }  
    });

    return sidebarView;
});