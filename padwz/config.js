/**
 * config
 */

var path = require('path');

exports.config = {
    debug: true,
    name: '记事本',
    description: 'My Blog',
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
    session_secret: 'node_blog',
  	auth_cookie_name: 'node_blog',

  	// admin 管理员权限
  	admins: { admin: true }
};