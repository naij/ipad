define(function(require, exports, module) {

    var siteViewTemplate = require('./site.html#');

    var siteView = Backbone.View.extend({  
        el: $("#main"),

        template: _.template(siteViewTemplate),

        initialize: function(options){
            this.render();  
        }, 

        render: function(){
            $(this.el).append(this.template());
            return this;  
        }  
    });

    return siteView;
});