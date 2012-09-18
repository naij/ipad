define(function(require, exports, module) {

    var layoutViewTemplate = require('./layout.html#');

    var layoutView = Backbone.View.extend({  
        el: $("body"),

        template: _.template(layoutViewTemplate),

        initialize: function(options){
            this.render();  
        }, 

        render: function(){
            $(this.el).append(this.template());
            return this;
        }  
    });

    return layoutView;
});