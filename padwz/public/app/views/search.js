define(function(require, exports, module) {

    var searchViewTemplate = require('./search.html#');

    var searchView = Backbone.View.extend({  
        el: $("#main"),

        template: _.template(searchViewTemplate),

        initialize: function(options){
            this.render();  
        }, 

        render: function(){
            $(this.el).html(this.template());
            return this;  
        }  
    });

    return searchView;
});