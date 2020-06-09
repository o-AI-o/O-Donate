const   express         = require('express'),
        passport        = require('passport');

const   db_user         = require('../models/db_user'),
        middleware      = require('../middleware');

const   router          = express.Router();

router.get('/', middleware.isLoggedIn, function (req,res){
    res.render("profile/index");
});

router.get('/edit-username', middleware.isLoggedIn, function (req,res){
    res.render("profile/edit-user");
});

router.post('/edit-username', function (req,res){
    const userUpdate = {
        username: req.body.username
    };
    
    db_user.updateOne(req.user, {$set: userUpdate}, function(err, user){
        if(err) {
            console.log(err);
            res.redirect('/profile/edit-username');
        }
        else res.redirect('/profile');
    });
});

module.exports = router;