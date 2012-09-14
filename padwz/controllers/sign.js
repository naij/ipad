var sanitize = require('validator').sanitize;
var crypto = require('crypto');
var config = require('../config').config;
var models = require('../models');
var User = models.User;


// Show user login page.
exports.showInit = function(req, res) {
    res.render('sign/init');
};

exports.init = function(req, res, next){
    var loginname = sanitize(req.body.name).trim().toLowerCase();
    var pass = sanitize(req.body.pass).trim();

    if (!loginname || !pass) {
        return res.render('sign/signin', {
            error: '用户名或者密码错误'
        });
    }

    
}

// Show user login page.
exports.showLogin = function(req, res) {
    if (req.session.user) {
        res.redirect('home');
    }
    else{
        res.render('sign/signin');
    }
};

// login.
exports.login = function(req, res, next) {
    var loginname = sanitize(req.body.name).trim().toLowerCase();
    var pass = sanitize(req.body.pass).trim();

    if (!loginname || !pass) {
        return res.render('sign/signin', {
            error: '用户名或者密码错误'
        });
    }

    User.findOne({'loginname': loginname}, function(err, user) {
        if (err) return next(err);

        if (!user) {
            return res.render('sign/signin', {
                error: '用户不存在。'
            });
        }
        if (pass !== user.pass) {
            return res.render('sign/signin', {
                error: '密码错误。'
            });
        }
        // store session cookie
        gen_session(user, res);

        res.redirect('home');
    });
};

// sign out
exports.signout = function(req, res, next) {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, {
        path: '/'
    });
    res.redirect(req.headers.referer || 'home');
};

// auth_user middleware
exports.auth_user = function(req, res, next) {
    if (req.session.user) {
        if (config.admins[req.session.user.name]) {
            req.session.user.is_admin = true;
        }
        res.local('current_user', req.session.user);
        return next();
    }
    else {
        var cookie = req.cookies[config.auth_cookie_name];
        if (!cookie) return next();

        var auth_token = decrypt(cookie, config.session_secret);
        var auth = auth_token.split('\t');
        var user_id = auth[0];

        User.findOne({_id: user_id}, function(err, user) {
            if (err) return next(err);
            if (user) {
                if (config.admins[user.name]) {
                    user.is_admin = true;
                }

                req.session.user = user;
                res.local('current_user', req.session.user);
                return next();
            }
            else {
                return next();
            }
        });
    }
};

// private

function gen_session(user, res) {
    var auth_token = encrypt(user._id + '\t' + user.name + '\t' + user.pass, config.session_secret);
    res.cookie(config.auth_cookie_name, auth_token, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30
    }); //cookie 有效期30天
}

function encrypt(str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}

function decrypt(str,secret) {
   var decipher = crypto.createDecipher('aes192', secret);
   var dec = decipher.update(str,'hex','utf8');
   dec += decipher.final('utf8');
   return dec;
}

function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}