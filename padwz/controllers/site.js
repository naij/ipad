var article_ctrl = require('./article');
var util = require('../libs/util');

exports.index = function(req, res, next) {
    //var proxy = EventProxy.create('tags', 'topics', 'hot_topics', 'stars', 'tops', 'no_reply_topics', 'pages', function(){console.log('ok')});

    article_ctrl.get_full_article(function(err, data){
        if (err) {
            next(err);
        }

        var tempDate = '';

        for(var i=0;i<data.length;i++){
            tempDate = util.format_date(data[i].update);
            data[i].publishDate = tempDate;
        }

        var recent_article = data.slice(0, 5);

        res.render('index', {
            article : data,
            recent_article : recent_article
        });
    });
};