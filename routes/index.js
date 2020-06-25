const   express         = require('express'),
        passport        = require('passport');

const   db_user         = require('../models/db_user'),
        db_fundraiser   = require('../models/db_fundraiser'),
        middleware      = require('../middleware');

const   router          = express.Router();

router.get('/', function(req, res){
    //Over Brute Force //Don't do it.
    let aChildren = [];
    let aHospital = [];
    let aAnimal = [];
    let aNature = [];

    db_fundraiser.find({fund_catg: "Children"}, function(err, fundChildren){ aChildren = fundChildren });
    db_fundraiser.find({fund_catg: "Hospital"}, function(err, fundHospital){ aHospital = fundHospital });
    db_fundraiser.find({fund_catg: "Animal"}, function(err, fundAnimal){ aAnimal = fundAnimal });
    db_fundraiser.find({fund_catg: "Nature"}, function(err, fundNature){ aNature = fundNature });

    setTimeout(function(){
        aChildren.sort(middleware.sortedByDateFu);
        aHospital.sort(middleware.sortedByDateFu);
        aAnimal.sort(middleware.sortedByDateFu);
        aNature.sort(middleware.sortedByDateFu);

        res.render("index", {aChildren: aChildren, aHospital: aHospital, aAnimal: aAnimal, aNature: aNature}); 
    },100);
    
});

router.get('/login', function(req, res){
    res.render("login");
});

router.post('/login', function(req, res){
    db_user.findOne({username: req.body.username}, function(err, user){
        if(!user) {
            req.flash('error', 'Username or Password incorrect.');
            res.redirect('/login');
        } else if (!user.confirmed) {
            req.flash('error', 'Your account is not verified. Please verify your Account.');
            res.redirect('/login');
        } else {
            passport.authenticate('local', {
                failureFlash: "Username or Password incorrect.",
                failureRedirect: "/login",
                successFlash: "Welcome to O-Donate, "+ user.username,
                successRedirect: "/"
            })(req, res, function(){});
        }
    });
});

router.get('/logout', function(req, res){
    req.logOut();
    req.flash('success', 'Log out successfully');
    res.redirect("/login");
});

module.exports = router;