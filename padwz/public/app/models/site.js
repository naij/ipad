define(function(require, exports, module) {
	var Backbone = require('backbone');

    var siteModel = Backbone.Model.extend({
        initialize: function(){

        },
        clear: function() {
            this.destroy();
        }
    });

    return siteModel;
});