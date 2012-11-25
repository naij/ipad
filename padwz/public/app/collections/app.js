define(function(require, exports, module) {

    var appModel = require('../models/app');

    var appCollection = Backbone.Collection.extend({
        model : appModel,
        url : '/api/app.json'
    });

    return appCollection;
});