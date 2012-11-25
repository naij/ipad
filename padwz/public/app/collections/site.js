define(function(require, exports, module) {

    var siteModel = require('../models/site');

    var siteCollection = Backbone.Collection.extend({
        model : siteModel,
        url : '/api/site.json'
    });

    return siteCollection;
});