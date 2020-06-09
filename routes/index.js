const   express         = require('express'),
        passport        = require('passport');

const   db_user         = require('../models/db_user'),
        middleware      = require('../middleware');

const   router          = express.Router();

router.get('/', function(req, res){
    res.render("index");
});

router.get('/login', function(req, res){
    res.render("login");
});

router.post('/login', function(req, res){
    const userCheck = req.body.username;
    db_user.findOne({username: userCheck}, function(err, user){
        if(!user) {
            req.flash('error', 'Username or Password incorrect.');
            res.redirect('/login');
        } else if (!user.confirmed){
            req.flash('error', 'Your account is not verified. Please verify your Account.');
            res.redirect('/login');
        }
        passport.authenticate('local', {
            failureFlash: "Username or Password incorrect.",
            failureRedirect: "/login",
            successFlash: "Welcome to O-Donate, "+ user.username,
            successRedirect: "/"
        })(req, res, function(){
            
        });
    })
});

router.get('/logout', function(req, res){
    req.logOut();
    req.flash('success', 'Log out successfully');
    res.redirect("/login");
});

router.get('/hidden', middleware.isLoggedIn, function (req,res){
    res.render("hidden");
});

module.exports = router;