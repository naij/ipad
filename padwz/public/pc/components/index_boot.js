define(function(require, exports, module) {
    var Class = require('class');
    var IndexResize = require('./index_resize'); 

    var IndexBoot = Class.create({
        initialize : function() {
            new IndexResize();
        }
    });

    return IndexBoot;
});