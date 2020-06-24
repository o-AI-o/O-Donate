let middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) return next();
    req.flash('error', 'You need to login first.');
    res.redirect('/login');
}

middlewareObj.sortedByDateFu = function(a, b){
    var dateA = new Date(a.fund_createDate), dateB = new Date(b.fund_createDate);
    return dateB - dateA;
}

middlewareObj.sortedByDateFH = function(a, b){
    var dateA = new Date(a.funh_date), dateB = new Date(b.funh_date);
    return dateB - dateA;
}

middlewareObj.sortedByDateDa = function(a, b){
    var dateA = new Date(a.date), dateB = new Date(b.date);
    return dateB - dateA;
}

module.exports = middlewareObj;