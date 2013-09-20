
/**
 * Module dependencies.
 */

var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var routes = require('./routes');
var config = require('./config').config;
var accessLog = fs.createWriteStream('access.log',{flags:'a'});
var errorLog = fs.createWriteStream('error.log',{flags:'a'});
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.register('.html', ejs);
    //app.set('view options', {layout: false});
    app.use(express.logger({stream: accessLog}));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: config.session_secret
    }));

    // 用户登入校验中间件
    app.use(require('./controllers/sign').auth_user);

    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
    app.error(function(err, req, res, next){
        var meta = '[' + new Date() + ']' + req.url + '\n';
        errorLog.write(meta + err.stack + '\n');
        next();
    });
});

// 视图助手
app.helpers({
    config: config
});

app.dynamicHelpers({
    user: function(req,res){
        return req.session.user;
    },
    error: function(req,res){
        var err = req.flash('error');
        if(err.length){
            return err;
        }
        else{
            return null;
        }
    }
});

// Routes
routes(app);

app.listen(config.port, config.server_ip);

console.log("app start");