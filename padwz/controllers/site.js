var util = require('../libs/util');
var models = require('../models');
var Site = models.Site;

exports.index = function(req, res, next) {
    // if(util.user_agent(req)){
    //     // 移动端
    //     res.render('index_ipad', {
    //         layout: 'layout_ipad'
    //     });
    // }
    // else{
    //     // pc端
    //     res.render('index');
    // }

    res.render('index_ipad', {
        layout: 'layout_ipad'
    });
};

// 网址列表
exports.list = function(req, res, next){
    Site.find().sort({order : 1}).exec(function(err, doc) {
        res.json({
            data: doc
        });
    });
}