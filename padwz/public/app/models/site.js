define(function(require, exports, module) {

    var siteModel = Backbone.Model.extend({
        initialize: function(){

        },
        clear: function() {
            this.destroy();
        } 
    });

    return siteModel;
});