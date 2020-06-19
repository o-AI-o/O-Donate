const   express         = require('express'),
        multer          = require('multer'),
        path            = require('path'),
        passport        = require('passport');

const   db_user         = require('../models/db_user'),
        middleware      = require('../middleware');

const   router          = express.Router();

const   storage         = multer.diskStorage({
    destination: './public/uploads/profiles',
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

router.get('/', function(req,res){
    res.render("register/index");
});

router.post('/', function(req,res){
    const userReg = new db_user({
        username: req.body.username,
        email: req.body.email,
        profilePic: "",
        firstname: "",
        lastname: "",
        description: "",
        address: "",
        creditnum: "",
        contactWeb: "",
        contactFace: "",
        contactTwit: "",
        contactIG: "",
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

router.post('/extraA', upload.single('Image'), function(req, res){
    const userUpdate = {
        profilePic: req.file.filename,
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