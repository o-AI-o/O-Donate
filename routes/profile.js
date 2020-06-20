const   express         = require('express'),
        passport        = require('passport');

const   db_user         = require('../models/db_user'),
        middleware      = require('../middleware');
const db_fundraiser = require('../models/db_fundraiser');

const   router          = express.Router();

router.get('/', middleware.isLoggedIn, function (req,res){
    res.render("profile/index");
});

router.get('/edit', middleware.isLoggedIn, function (req,res){
    res.render("profile/edit");
});

router.post('/edit', function (req,res){
    const userUpdate = {
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    
    db_user.updateOne(req.user, userUpdate, function(err, user){
        if(err) res.redirect('/profile/edit');
        else res.redirect('/profile');
    });
});

module.exports = router;