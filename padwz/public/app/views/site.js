define(function(require, exports, module) {

    var siteViewTemplate = require('./site.html#');

    var siteView = Backbone.View.extend({  
        el: $("#main"),

        template: _.template(siteViewTemplate),

        events: { 
            'swipeLeft .site': 'swipeLeft' ,
            'swipeRight .site': 'swipeRight'
        },

        initialize: function(options){
            this.render();  
        }, 

        render: function(){
            $(this.el).html(this.template());

            var site = $(this.el).find('.site');
            var siteBd = $(this.el).find('.site-bd');
            var panel = $(this.el).find('.panel');
            var width = panel.width();
            var height = panel.height();

            site.css({'width':width + 'px','height':height +'px'});
            panel.css('width',width + 'px');
            siteBd.css('width',width*2 + 'px');

            return this;  
        },

        swipeLeft : function(){
            var siteBd = $(this.el).find('.site-bd');
            var panel = $(this.el).find('.panel');
            var width = panel.width();

            siteBd.css('left','-' + width + 'px');
            //siteBd.animate({left: '-800px'}, 500, 'ease-out');
        },

        swipeRight : function(){
            var siteBd = $(this.el).find('.site-bd');
            var panel = $(this.el).find('.panel');
            var width = panel.width();

            siteBd.css('left','0px');
            //siteBd.animate({left: width + 'px'}, 500, 'ease-out');
        }  
    });

    return siteView;
});