const   express         = require('express'),
        multer          = require('multer'),
        path            = require('path');

const   db_fundraiser   = require('../models/db_fundraiser'),
        middleware      = require('../middleware');
const { db } = require('../models/db_fundraiser');
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

router.get("/id/:id", function(req, res){
    db_fundraiser.findOne({_id: req.params.id}, function(err, data){
        console.log(data);
        res.render("fundraiser/FundraiserDetail", {tFundraiser: data, fname: data.fund_name});
    });
});

router.get("/category", function(req, res){
    res.render("fundraiser/categoryAll");
});

router.get("/category/:type", function(req, res){
    db_fundraiser.find({fund_catg: req.params.type}, function(err, data){
        res.render("fundraiser/categoryOne", {cFundraiser: data, cname: req.params.type});
    });
});

router.get("/addFundraiser", function(req, res){
    res.render("fundraiser/fundraiserAdd");
});

router.post("/add", upload.single('Image'), function(req, res){
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
            (req.user).save(function(err, success){
                if (err) res.redirect("/fundraiser/add");
                else res.redirect("/fundraiser");
            });
        }
    });
});

module.exports = router;