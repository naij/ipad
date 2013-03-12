define(function(require, exports, module) {
    var Class = require('class');
    var index_resize = require('./index_resize'); 

    var index_boot = Class.create({
        initialize : function() {
            new index_resize();
        }
    });

    module.exports = index_boot;
});

