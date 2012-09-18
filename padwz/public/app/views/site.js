define(function(require, exports, module) {

    var siteViewTemplate = require('./site.html#');

    var siteView = Backbone.View.extend({  
        el: $("#main"),

        template: _.template(siteViewTemplate),

        events: { 
            'swipeLeft .main' : 'swipeLeft',
            'swipeRight .main' : 'swipeRight'
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
        },

        swipeLeft : function(e){
            var siteBd = $(this.el).find('.site-bd');
            var panel = $(this.el).find('.panel');
            var width = panel.width();

            siteBd.anim({translateX: '-'+ width +'px'}, 0.45, 'cubic-bezier(0, 0, 0.1, 1.0)');
        },

        swipeRight : function(e){
            var siteBd = $(this.el).find('.site-bd');
            var panel = $(this.el).find('.panel');
            var width = panel.width();

            siteBd.anim({translateX: '0px'}, 0.45, 'cubic-bezier(0, 0, 0.1, 1.0)');
        }  
    });

    return siteView;
});