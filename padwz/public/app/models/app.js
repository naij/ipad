define(function(require, exports, module) {

    var appModel = Backbone.Model.extend({
        initialize: function(){

        },
        clear: function() {
            this.destroy();
        } 
    });

    return appModel;
});