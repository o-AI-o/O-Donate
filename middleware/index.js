let middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) return next();
    req.flash('error', 'You need to login first.');
    res.redirect('/login');
}

middlewareObj.sortedByDate = function(a, b){
    var dateA = new Date(a.fund_createDate), dateB = new Date(b.fund_createDate);
    return dateB - dateA;
}

module.exports = middlewareObj;