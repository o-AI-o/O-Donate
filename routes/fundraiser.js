const   express         = require('express'),
        passport        = require('passport');

const   db_user         = require('../models/db_user'),
        middleware      = require('../middleware');

const   router          = express.Router();

router.get("/", function(req, res){
    res.render("fundraiser/category");
});

// router.get("/id/:id", function(req, res){

// });

router.get("/:id/donate", function(req, res){

});

router.get("/category", function(req, res){

});

router.get("/add", function(req, res){
    res.render("fundraiser/donate");
});

// router.get("/category", function(req, res){
//     res.render("fundraiser/category");
// });

module.exports = router;