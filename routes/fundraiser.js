const   express         = require('express'),
        multer          = require('multer'),
        fs              = require('fs'),
        path            = require('path');

const   db_user         = require('../models/db_user'),
        db_fundraiser   = require('../models/db_fundraiser'),
        db_fundHistory  = require('../models/db_fundhistory'),
        db_category     = require('../models/db_category'),
        middleware      = require('../middleware');
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
        data.sort(middleware.sortedByDateFu);
        db_category.findOne({catg_name: req.params.type}, function(err, cDetail){
            res.render("fundraiser/categoryOne", {cFundraiser: data, cname: req.params.type, thisCategory: cDetail});
        });
    });
});

router.get("/id/:id", function(req, res){
    db_fundraiser.findOne({_id: req.params.id}, function(err, fundraiser){
        let donateArray = [];
        let i = 0;

        (fundraiser.fundHistory).some(function(hID){
            i++;
            db_fundHistory.findById(hID.historyID, function(err, history){
                if (history) {
                    db_user.findById(history.funh_userid, function(err, user){
                        donateArray.push({
                            id: user._id,
                            name: user.username,
                            pic: user.profilePic,
                            price: history.funh_value,
                            date: history.funh_date
                        });
                    });
                }
            });
            return (i == 5);
        });
        
        setTimeout(function(){
            donateArray.sort(middleware.sortedByDateDa);
            db_user.findOne({_id: fundraiser.fund_author}, function(err, user){
                res.render("fundraiser/fundraiserDetail", {tFundraiser: fundraiser, tUser: user, dArray: donateArray});
            });
        },100);
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
            (donateFundraiser.fundHistory).push({historyID: nFundHistory._id});
            donateFundraiser.save(function(err, complete){});
        });

        setTimeout(function(){
           res.redirect("/fundraiser/id/" + req.params.id);
        },100);
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

router.get("/id/:id/edit", function(req, res){
    db_fundraiser.findById(req.params.id, function(err, fundraiser){
        res.render("fundraiser/fundraiserEdit", {tFundraiser: fundraiser});
    });
})

router.post("/id/:id/edit", function(req, res){
    db_fundraiser.findById(req.params.id, function(err, fundraiser){
        if (req.body.fundname != "") fundraiser.fund_name = req.body.fundname;
        if (req.body.fundtopic != "") fundraiser.fund_title = req.body.fundtopic;
        if (req.body.funddesc != "") fundraiser.fund_description = req.body.funddesc;

        fundraiser.save(function(err, complete){
            if(err) req.flash("error", "Edit Fundraiser Uncomplete");
            else req.flash("success", "Edit Fundraiser Complete");
            res.redirect('/fundraiser/id/' + req.params.id);
        });
    });
})

router.post("/id/:id/editPic", upload.single('Image'), function(req, res){
    db_fundraiser.findOne({_id: req.params.id}, function(err, fundraiser){
        const imagePath = './public/uploads/fundraisers/' + fundraiser.fund_image;

        fs.unlink(imagePath, function(err){
            if(err) console.log(err);
        });

        fundraiser.fund_image = req.file.filename;
        fundraiser.save(function(err, complete){
            if(err) req.flash("error", "Change Fundraiser Picture Uncomplete");
            else req.flash("success", "Change Fundraiser Picture Complete");
            res.redirect('/fundraiser/id/' + req.params.id);
        });
    });
});

router.get("/yourFundraiser", function(req, res){
    db_fundraiser.find({fund_author: (req.user)._id}, function(err, yFundraiser){
        res.render("fundraiser/yourfundraiser", {cFundraiser: yFundraiser});
    });
});

module.exports = router;