const   express         = require('express'),
        passport        = require('passport');

const   db_user         = require('../models/db_user');
const   db_fundraiser   = require('../models/db_fundraiser'),
        middleware      = require('../middleware');

const   router          = express.Router();

router.get("/", function(req, res){
    res.render("fundraiser/category");
});

router.get("/:id/donate", function(req, res){

});

router.get("/category", function(req, res){
    res.render("fundraiser/category");
});

router.get("/add", function(req, res){
    res.render("fundraiser/addFundraiser");
});

router.post("/add", function(req, res){
    const fundraiReg = new db_fundraiser({
        fund_name: req.body.fname,
        fund_title: req.body.title,
        fund_description: req.body.description,
        fund_image: "https://s3-ap-northeast-1.amazonaws.com/anime.bang-dream.com/pico/wp-content/uploads/2020/06/PICO06_03_HP.jpg",
        fund_moneytraget: req.body.target,
        fund_moneynow: 0,
        fundHistory: [],
        fundUpdate: [],
        fund_author: req.user._id,
        adminConfirm: false
    });

    fundraiReg.save(function(err, complete){
        res.redirect("/fundraiser/")
    });
});

module.exports = router;