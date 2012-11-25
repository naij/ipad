define(function(require, exports, module) {

    var appViewTemplate = require('./app.html#');
    var appCollection = require('../collections/app');
    var appC = new appCollection();

    var appView = Backbone.View.extend({  
        el: $("#main"),

        events : {
            "click .item" : "detail"
        },

        initialize: function(options){
            var self = this;
            appC.bind('reset', function(){
                appC.each(self.render,self);
            });
            self.load(1);
        },

        load : function(pageIndex){
            appC.fetch({data: {page: pageIndex}});
        },

        render: function(model){
            var template = _.template(appViewTemplate,model.toJSON());
            
            $(this.el).html(template);
        },

        detail : function(e){
            var curNode = e.currentTarget;
            var dialog = $('<div class="dialog"></div>');

            $(this.el).find('.app').append(dialog);
        }
    });

    return appView;
});