define(function(require, exports, module) {

    var contentViewTemplate = require('./content.html#');

    var contentView = Backbone.View.extend({  
        el: $("body"),

        template: _.template(contentViewTemplate),

        initialize: function(options){
            this.render();  
        }, 

        render: function(){
            $(this.el).append(this.template());  
            return this;  
        }  
    });

    return contentView;
});