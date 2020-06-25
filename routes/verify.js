const   express         = require('express');

const   db_user         = require('../models/db_user'),
        middleware      = require('../middleware');

const   router          = express.Router();

router.get('/id/:user_id', function(req,res){
    db_user.findById(req.params.user_id, function(err, user){
        if(!user || user.confirmed) {
            req.flash("error", "Error Link");
            return res.redirect('/login');
        }
        verifyUser = user._id;

        (user.logHistory).push({
            date: Date.now(),
            type: "Account Verify",
            target: "",
            link: "",
            amount: 0
        });
        (user.logHistory).sort(middleware.sortedByDateDa);
        user.save(function(err, complete){});

        db_user.updateOne({_id: verifyUser}, {confirmed: true}, function(err, user2){
            if(err) return res.redirect('/login');
            else return res.redirect('/register/extra');
        });
    });
});

module.exports = router;