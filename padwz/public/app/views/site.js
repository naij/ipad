define(function(require, exports, module) {

    var siteViewTemplate = require('./site.html#');
    var siteCollection = require('../collections/site');
    var siteC = new siteCollection();

    var siteView = Backbone.View.extend({  
        el: $("#main"),

        initialize: function(options){
            var self = this;
            siteC.bind('reset', function(){
                siteC.each(self.render,self);
            });
            siteC.fetch();
        }, 

        render: function(model){
            console.log(model.toJSON());

            var template = _.template(siteViewTemplate,model.toJSON());
            
            $(this.el).html(template);

            var site = $(this.el).find('.site');
            var panel = $(this.el).find('.panel');
            var width = panel.width();

            site.css({'width':width + 'px'});

            //水平滑动
            var slider = new Swipe($('#site')[0]);
            slider = null;
        }
    });

    return siteView;
});