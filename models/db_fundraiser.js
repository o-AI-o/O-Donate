const   mongoose      = require("mongoose"),
        passportLM    = require("passport-local-mongoose");

let fundraiserSchema = new mongoose.Schema({
    fund_name       : String,
    fund_descfirst  : String,
    fund_descall    : String,
    fund_moneynow   : Number,
    fund_moneyall   : Number
});

fundraiserSchema.plugin(passportLM);

module.exports = mongoose.model('Fundraiser', fundraiserSchema);