const   mongoose      = require("mongoose"),
        passportLM    = require("passport-local-mongoose");

let fundraiList = new mongoose.Schema({
    fundraiserID: String
})

let userSchema = new mongoose.Schema({
    username    : String,
    password    : String,
    email       : String,
    profilePic  : String,     
    firstname   : String,
    lastname    : String,
    description : String,
    address     : String,
    creditnum   : String,
    contactWeb  : String,
    contactFace : String,
    contactTwit : String,
    contactIG   : String,
    joinDate    : Date,
    fundraiOwner: [fundraiList], 
    confirmed   : Boolean
});

userSchema.plugin(passportLM);

module.exports = mongoose.model('User', userSchema);