const   mongoose      = require("mongoose"),
        passportLM    = require("passport-local-mongoose");

// let userData = new mongoose.Schema({
//     firstname   : String,
//     lastname    : String,
//     description : String,
//     address     : String,
//     creditnum   : String
// });

// let contactData = new mongoose.Schema({
//     contact     : String
// });

let userSchema = new mongoose.Schema({
    username    : String,
    password    : String,
    email       : String,
    firstname   : String,
    lastname    : String,
    description : String,
    address     : String,
    creditnum   : String,
    contact     : String,
    confirmed   : Boolean,
    // information : [userData],
    // contact     : [contactData]    
});

userSchema.plugin(passportLM);

module.exports = mongoose.model('User', userSchema);