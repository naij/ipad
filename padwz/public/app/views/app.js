define(function(require, exports, module) {

    var appViewTemplate = require('./app.html#');

    var appView = Backbone.View.extend({  
        el: $("#main"),

        template: _.template(appViewTemplate),

        initialize: function(options){
            this.render();
        }, 

        render: function(){
            $(this.el).html(this.template());
            return this;  
        }  
    });

    return appView;
});