const   mongoose      = require("mongoose"),
        passportLM    = require("passport-local-mongoose");

let userSchema = new mongoose.Schema({
    username    : String,
    password    : String,
    email       : String,
    firstname   : String,
    lastname    : String,
    description : String,
    address     : String,
    creditnum   : String,
    contactWeb  : String,
    contactFace : String,
    contactTwit : String,
    contactIG   : String,
    confirmed   : Boolean
});

userSchema.plugin(passportLM);

module.exports = mongoose.model('User', userSchema);