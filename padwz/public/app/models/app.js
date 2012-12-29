define(function(require, exports, module) {
	var Backbone = require('backbone');
	
    var appModel = Backbone.Model.extend({
        initialize: function(){

        },
        clear: function() {
            this.destroy();
        } 
    });

    return appModel;
});