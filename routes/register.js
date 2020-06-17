const   express         = require('express'),
        passport        = require('passport');

const   db_user         = require('../models/db_user'),
        middleware      = require('../middleware');

const   router          = express.Router();

router.get('/', function(req,res){
    res.render("register/index");
});

router.post('/', function(req,res){
    const userReg = new db_user({
        username: req.body.username,
        email: req.body.email,
        confirmed: false
    });

    db_user.register(userReg, req.body.password, function(err, user){
        if(err) return res.render('register');
        console.log("Verify Link: http://localhost:1412/verify/id/" + user._id);
        return res.redirect('/register/complete');
    });
});

router.get('/complete', function(req, res){
    res.render("register/complete");
});

router.get('/extra', function(req, res){
    res.render("register/extraA");
});

router.post('/extraA', function(req, res){
    const userUpdate = {
        firstname: req.body.Firstname,
        lastname: req.body.Lastname,
        description: req.body.Description,
        address: req.body.Address
    };
    
    db_user.updateOne({_id: verifyUser}, userUpdate, function(err, progress){
        if(err) res.redirect('/login');
        else res.render("register/extraB");
    });
});

router.post('/extraB', function(req, res){
    const userUpdate = {
        creditnum: req.body.Creditnum
    };
    
    db_user.updateOne({_id: verifyUser}, userUpdate, function(err, progress){
        if(err) res.redirect('/login');
        else res.render("register/extraC");
    });
});

router.post('/extraC', function(req, res){
    const userUpdate = {
        contactWeb: req.body.website,
        contactFace: req.body.facebook,
        contactTwit: req.body.twitter,
        contactIG: req.body.instagram
    };
    
    db_user.updateOne({_id: verifyUser}, userUpdate, function(err, progress){
        if(err) res.redirect('/login');
        else {
            req.flash("success", "Verify Complete");
            res.redirect("/login");
        }
    });
});

module.exports = router;