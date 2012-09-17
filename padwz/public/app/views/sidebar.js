define(function(require, exports, module) {

    var sidebarViewTemplate = require('./sidebar.html#');

    var sidebarView = Backbone.View.extend({  
        el: $("#sideBar"),

        template: _.template(sidebarViewTemplate),

        initialize: function(options){
            this.render();  
        }, 

        render: function(){
            $(this.el).append(this.template());
            return this;  
        }  
    });

    return sidebarView;
});