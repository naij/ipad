/**
 * 应用配置文件
 */
exports.config = {
    debug: true,
    name: 'Pad导航',
    description: 'ipad 网址导航',
    version: '0.1',

    //配置mongodb 线上环境和本地环境
    //db: 'mongodb://127.0.0.1/test',
    db : function(){
        if(process.env.VCAP_SERVICES){
            var env = JSON.parse(process.env.VCAP_SERVICES);
            var mongo = env['mongodb-1.8'][0]['credentials'];
        }
        else{
            var mongo = {
                "hostname":"localhost",
                "port":27017,
                "username":"",
                "password":"",
                "name":"",
                "db":"test"
            }
        }
        var generate_mongo_url = function(obj){
            obj.hostname = (obj.hostname || 'localhost');
            obj.port = (obj.port || 27017);
            obj.db = (obj.db || 'test');
            if(obj.username && obj.password){
                return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
            }
            else{
                return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
            }
        }

        return generate_mongo_url(mongo);
    },

    // session && cookie
    session_secret: 'ipadwz',
  	auth_cookie_name: 'ipadwz',

    // 又拍云账户
    upyun_buckname : 'padwz',
    upyun_username : 'wolongxzg',
    upyun_password : 'wang354438',
    upyun_path : 'http://padwz.b0.upaiyun.com/',

  	// admin 管理员权限
  	admins: { admin: true }
};