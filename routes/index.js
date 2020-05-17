const   express         = require('express'),
        passport        = require('passport');

const   db_user         = require('../models/db_user'),
        middleware      = require('../middleware');

const   router          = express.Router();

router.get('/', function(req,res){
    res.render("index");
});

router.get('/login', function(req,res){
    res.render("login");
});

router.post('/login', passport.authenticate('local',{
    successRedirect: '/hidden',
    failureRedirect: '/login'
}), function (req,res){

});

router.get('/register', function(req,res){
    res.render("register");
});

router.post('/register', function(req,res){
    const userReg = new db_user({
        username: req.body.username,
        information: [{
            name: req.body.realname,
            email: req.body.email,
            description: "I'm test user",
            creditnum: "0000-0000-0000"
        }],
        contact: [{
            phone: "-",
            facebookN: "-",
            facebookL: "-",
            websiteN: "-",
            websiteL: "-",
        }]
    });

    db_user.register(userReg, req.body.password, function(err, db_user){
        if(err) return res.render('register');
        passport.authenticate('local')(req, res, function(){
            res.redirect('/hidden');
        });
    });
});

router.get('/logout', function(req,res){
    req.logOut();
    res.redirect("/login");
});

router.get('/hidden', middleware.isLoggedIn, function (req,res){
    res.render("hidden");
});

module.exports = router;