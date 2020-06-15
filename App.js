const   express         = require("express"),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        flash           = require('connect-flash'),
        passport        = require("passport"),
        passportL       = require("passport-local"),
        passportLM      = require("passport-local-mongoose");

const   db_user         = require('./models/db_user');
const   db_fundraiser   = require('./models/db_fundraiser');

const   indexRoutes     = require('./routes/index'),
        profileRoutes   = require('./routes/profile'),
        registerRoutes  = require('./routes/register'),
        verifyRoutes    = require('./routes/verify'),
        fundraiserRoutes= require('./routes/fundraiser');

const   app             = express();

mongoose.connect('mongodb://localhost:27017/O-Donate', {useNewUrlParser: true});

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

app.use(require('express-session')({
    secret: 'Kimi to natsu no owari shōrai no yume',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.verifyUser = "-";
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

passport.use(new passportL(db_user.authenticate()));
passport.serializeUser(db_user.serializeUser());
passport.deserializeUser(db_user.deserializeUser());

app.use('/', indexRoutes);
app.use('/profile', profileRoutes);
app.use('/register', registerRoutes);
app.use('/verify', verifyRoutes);
app.use('/fundraiser', fundraiserRoutes);

app.listen(1412,function(){
    console.log('Example app listening on port 1412!');
});

app.get("/add", function(req, res){
    res.render("test/add");
});