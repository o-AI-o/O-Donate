const   express         = require('express'),
        multer          = require('multer'),
        path            = require('path'),
        fs              = require('fs'),
        passport        = require('passport');

const   db_user         = require('../models/db_user'),
        middleware      = require('../middleware');
const   db_fundraiser   = require('../models/db_fundraiser');
const { db } = require('../models/db_user');

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

router.get('/', function(req, res){
    res.redirect('/profile/id/'+(req.user)._id);
})

router.get('/id/:id', function(req, res){
    db_user.findById(req.params.id, function(err, user){
        res.render("profile/index", {tUser: user});
    });
});

router.get('/id/:id/edit', middleware.isLoggedIn, function (req,res){
    if((req.user)._id == req.params.id) res.render("profile/edit");
    else res.redirect("back");
});

router.post('/edit', function (req,res){
    if (req.body.username != "") (req.user).username = req.body.username;
    if (req.body.firstname != "") (req.user).firstname = req.body.firstname;
    if (req.body.lastname != "") (req.user).lastname = req.body.lastname;
    if (req.body.email != "") (req.user).email = req.body.email;
    if (req.body.facebook != "") (req.user).contactFace = req.body.facebook;
    if (req.body.twitter != "") (req.user).contactTwit = req.body.twitter;
    if (req.body.instagram != "") (req.user).contactIG = req.body.instagram;
    if (req.body.website != "") (req.user).contactWeb = req.body.website;

    (req.user).save(function(err, complete){
        if(err) req.flash("error", "Edit Profile Uncomplete");
        else req.flash("success", "Edit Profile Complete");
        res.redirect('/profile');
    });
});

router.post('/editPic', upload.single('Image'), function(req, res){
    const imagePath = './public/uploads/profiles/' + (req.user).profilePic;
    fs.unlink(imagePath, function(err){
        if(err) console.log(err);
    });

    (req.user).profilePic = req.file.filename;
    (req.user).save(function(err, complete){
        if(err) req.flash("error", "Change Profile Picture Uncomplete");
        else req.flash("success", "Change Profile Picture Complete");
        res.redirect('/profile');
    });
});

module.exports = router;