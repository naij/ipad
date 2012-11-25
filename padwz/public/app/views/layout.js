define(function(require, exports, module) {

    var layoutViewTemplate = require('./layout.html#');
    var lavalamp = require('../components/lavalamp');

    var layoutView = Backbone.View.extend({  
        el: $("body"),

        template: _.template(layoutViewTemplate),

        initialize: function(options){
            this.render();  
        },

        render: function(){
            $(this.el).append(this.template());

            new lavalamp({el:'#side-bar'});
        }
    });

    return layoutView;
});