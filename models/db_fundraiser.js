const   mongoose      = require("mongoose"),
        passportLM    = require("passport-local-mongoose");

let donateListSchema = new mongoose.Schema({
    dont_name       : String,
    dont_total      : Number,
    dont_date       : Date
});

let fundraiserSchema = new mongoose.Schema({
    fund_name       : String,
    fund_desctitle  : String,
    fund_description: String,
    fund_moneytraget: Number,
    fund_moneynow   : Number,
    fundHistory     : [donateListSchema]
});

fundraiserSchema.plugin(passportLM);

module.exports = mongoose.model('Fundraiser', fundraiserSchema);