var crypto = require('crypto');

/* 时间格式化 */
exports.format_date = function(date, friendly) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (friendly) {
        var now = new Date();
        var mseconds = -(date.getTime() - now.getTime());
        var time_std = [1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000];
        if (mseconds < time_std[3]) {
            if (mseconds > 0 && mseconds < time_std[1]) {
                return Math.floor(mseconds / time_std[0]).toString() + ' 秒前';
            }
            if (mseconds > time_std[1] && mseconds < time_std[2]) {
                return Math.floor(mseconds / time_std[1]).toString() + ' 分钟前';
            }
            if (mseconds > time_std[2]) {
                return Math.floor(mseconds / time_std[2]).toString() + ' 小时前';
            }
        }
    }

    //month = ((month < 10) ? '0' : '') + month;
    //day = ((day < 10) ? '0' : '') + day;
    hour = ((hour < 10) ? '0' : '') + hour;
    minute = ((minute < 10) ? '0' : '') + minute;
    second = ((second < 10) ? '0' : '') + second;

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
};

/* 判断客户端类型 */
exports.user_agent = function(req){
    var pcHeaders = [
        "Windows 98",
        "Windows ME",
        "Windows 2000",
        "Windows XP",
        "Windows NT", 
        "Ubuntu"
    ]
    var mobileUserAgents = [
        "iPhone",//Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_1 like Mac OS X; zh-cn) AppleWebKit/532.9 (KHTML like Gecko) Mobile/8B117  
        "iPad"//Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; zh-cn) AppleWebKit/531.21.10 (KHTML like Gecko) Version/4.0.4 Mobile/7B367 Safari/531.21.10  
    ]

    var pcFlag = false;
    var mobileFlag = false;
    var userAgent = req.headers['user-agent'];

    for (var i = 0; !mobileFlag && userAgent != null && userAgent != '' && i < mobileUserAgents.length; i++) {
        if(userAgent.indexOf(mobileUserAgents[i]) > 0){
            mobileFlag = true;  
            break;
        }
    }
    for (var i = 0; userAgent != null && userAgent != '' && i < pcHeaders.length; i++) {
        if(userAgent.indexOf(pcHeaders[i]) > 0){
            pcFlag = true;
            break; 
        }
    }
    if(mobileFlag == true && mobileFlag != pcFlag){
        return true;
    }

    return false;
}

// md5加密
exports.md5 = function(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}