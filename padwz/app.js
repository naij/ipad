
/**
 * Module dependencies.
 */

var express = require('express');
var ejs = require('ejs');
var routes = require('./routes');
var config = require('./config').config;

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.register('.html', ejs);
    //app.set('view options', {layout: false});
    app.use(express.bodyParser({
        uploadDir: config.upload_dir
    }));
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: config.session_secret
    }));

    // custom middleware
    app.use(require('./controllers/sign').auth_user);

    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// 视图助手
app.helpers({
    config: config
});

app.dynamicHelpers({
    user : function(req,res){
        return req.session.user;
    },
    error : function(req,res){
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

app.listen(3000,'192.168.1.2');

console.log("app start");
