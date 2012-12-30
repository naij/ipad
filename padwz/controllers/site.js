var util = require('../libs/util');

exports.index = function(req, res, next) {
    if(util.user_agent(req)){
        // 移动端
        res.render('index_ipad', {
            layout: 'layout_ipad'
        });
    }
    else{
        // pc端
        res.render('index');
    }
};