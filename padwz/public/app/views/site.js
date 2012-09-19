define(function(require, exports, module) {

    var siteViewTemplate = require('./site.html#');

    var siteView = Backbone.View.extend({  
        el: $("#main"),

        template: _.template(siteViewTemplate),

        initialize: function(options){
            this.render();  
        }, 

        render: function(){
            $(this.el).html(this.template());

            var site = $(this.el).find('.site');
            var panel = $(this.el).find('.panel');
            var width = panel.width();

            site.css({'width':width + 'px'});

            //水平滑动
            var slider = new Swipe($('#site')[0]);
        }
    });

    return siteView;
});