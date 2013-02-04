// 显示后台管理页面
exports.showAdmin = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('home');
    }

    res.render('admin/admin');
};