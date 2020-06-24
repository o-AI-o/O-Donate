const   express         = require('express'),
        multer          = require('multer'),
        path            = require('path');

const   db_user         = require('../models/db_user'),
        db_fundraiser   = require('../models/db_fundraiser'),
        db_fundHistory  = require('../models/db_fundhistory'),
        db_category     = require('../models/db_category'),
        middleware      = require('../middleware');
const { route } = require('.');
const { db } = require('../models/db_category');

const   router          = express.Router();

const   storage         = multer.diskStorage({
    destination: './public/uploads/fundraisers',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const   imageFilter     = function(req, file, cb){
    var ext = path.extname(file.originalname);
    if(ext == '.png' || ext !== '.jpg' || ext !== '.jpeg'){
        cb(null, true);
    } else {
        return cb(new Error('ERROR'), false);
    }
}

const   upload          = multer({storage: storage, fileFilter: imageFilter});

router.get("/", function(req, res){
    res.render("fundraiser/categoryAll");
});

router.get("/category", function(req, res){
    res.render("fundraiser/categoryAll");
});

router.get("/category/:type", function(req, res){
    db_fundraiser.find({fund_catg: req.params.type}, function(err, data){
        data.sort(middleware.sortedByDate);
        db_category.findOne({catg_name: req.params.type}, function(err, cDetail){
            res.render("fundraiser/categoryOne", {cFundraiser: data, cname: req.params.type, thisCategory: cDetail});
        });
    });
});

router.get("/id/:id", function(req, res){
    db_fundraiser.findOne({_id: req.params.id}, function(err, fundraiser){
        db_user.findOne({_id: fundraiser.fund_author}, function(err, user){
            res.render("fundraiser/fundraiserDetail", {tFundraiser: fundraiser, fname: fundraiser.fund_name, tUser: user});
        });
    });
});

router.get("/id/:id/donate", middleware.isLoggedIn, function(req, res){
    db_fundraiser.findOne({_id: req.params.id}, function(err, data){
        res.render("fundraiser/fundraiserDonate", {tFundraiser: data, fname: data.fund_name});
    });
});

router.post("/donate/:id", function(req, res){
    db_fundraiser.findOne({_id: req.params.id}, function(err, donateFundraiser){
        donateFundraiser.fund_moneynow = donateFundraiser.fund_moneynow + Number(req.body.donateBox);

        const newFundHistory = new db_fundHistory({
            funh_userid: req.user._id,
            fund_fundid: donateFundraiser._id,
            funh_value: req.body.donateBox,
            funh_date: Date.now()
        })

        newFundHistory.save(function(err, nFundHistory){
            (donateFundraiser.fundHistory).push({historyid: nFundHistory._id});
            donateFundraiser.save(function(err, complete){});
        });

        res.redirect("/fundraiser/id/" + req.params.id);
    });
});

router.get("/addFundraiser", middleware.isLoggedIn, function(req, res){
    res.render("fundraiser/fundraiserAdd");
});

router.post("/addFundraiser", upload.single('Image'), function(req, res){
    const fundraiReg = new db_fundraiser({
        fund_name: req.body.fname,
        fund_title: req.body.title,
        fund_catg: req.body.category,
        fund_description: req.body.description,
        fund_image: req.file.filename,
        fund_createDate: new Date(),
        fund_moneytraget: req.body.target,
        fund_moneynow: 0,
        fundHistory: [],
        fundUpdate: [],
        fund_author: req.user.id,
        adminConfirm: false
    });

    fundraiReg.save(function(err, fundraiser){
        if (err) res.redirect("/fundraiser/add");
        else {
            var fundraiArray = req.user.fundraiOwner;
            fundraiArray.push({fundraiserID: fundraiser._id});
            (req.user).save(function(err, complete){
                if (err) res.redirect("/fundraiser/add");
                else res.redirect("/fundraiser");
            });
        }
    });
});

router.get("/yourFundraiser", function(req, res){
    db_fundraiser.find({fund_author: (req.user)._id}, function(err, aFundraiser){
        res.render("fundraiser/yourfundraiser", {cFundraiser: aFundraiser});
    });
});

module.exports = router;