const   mongoose      = require("mongoose"),
        passportLM    = require("passport-local-mongoose");

let userData = new mongoose.Schema({
    name        : String,
    email       : String,
    description : String,
    creditnum   : String
});

let contactData = new mongoose.Schema({
    phone       : String,
    facebookN   : String,
    facebookL   : String,
    websiteN    : String,
    websiteL    : String
});

let userSchema = new mongoose.Schema({
    username    : String,
    password    : String,
    information : [userData],
    contact     : [contactData]    
});

userSchema.plugin(passportLM);

module.exports = mongoose.model('User', userSchema);