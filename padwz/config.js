/**
 * 应用配置文件
 */
exports.config = {
    debug : true,
    name : 'Pad导航',
    description : 'ipad 网址导航',
    version : '0.1',

    db : 'mongodb://127.0.0.1:27017/test',
    session_secret : 'ipadwz',
  	auth_cookie_name : 'ipadwz',
    // server_ip : '42.121.30.57',
    server_ip : '127.0.0.1',
    port : 3000,

    // 又拍云账户
    upyun_buckname : 'padwz',
    upyun_username : 'wolongxzg',
    upyun_password : 'wang354438',
    upyun_path : 'http://padwz.b0.upaiyun.com/',

  	// admin 管理员权限
  	admins: { admin : true }
};