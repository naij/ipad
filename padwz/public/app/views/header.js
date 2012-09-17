define(function(require, exports, module) {

    var headerViewTemplate = require('./header.html#');

    var headerView = Backbone.View.extend({  
        el: $("body"),

        template: _.template(headerViewTemplate),

        initialize: function(options){
            this.render();  
        }, 

        render: function(){
            $(this.el).append(this.template());  
            return this;  
        }  
    });

    return headerView;
});