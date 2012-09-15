define(function(require, exports, module) {

    var headerView = Backbone.View.extend({  
        el: $("body"), 

        initialize: function(options){  
            this.options = options;  
            this.bind('change', this.render);  
            this.model = this.options.model;  
        }, 

        render: function(){ 
            $(this.el).append('<div>'+this.model.msg+'</div>');  
            return this;  
        }  
    });

    return headerView;
});