define(function(require, exports, module) {
	var Backbone = require('backbone');
    var siteModel = require('../models/site');

    var siteCollection = Backbone.Collection.extend({
        model : siteModel,
        url : '/site/list'
    });

    return siteCollection;
});