const   express         = require('express'),
        multer          = require('multer'),
        path            = require('path');

const   db_fundraiser   = require('../models/db_fundraiser'),
        middleware      = require('../middleware');

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

router.post("/add", upload.single('Image'), function(req, res){
    const fundraiReg = new db_fundraiser({
        fund_name: req.body.fname,
        fund_title: req.body.title,
        fund_description: req.body.description,
        fund_image: req.file.filename,
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