const   mongoose      = require("mongoose"),
        passportLM    = require("passport-local-mongoose");

let donateListData = new mongoose.Schema({
    dont_name       : String,
    dont_total      : Number,
    dont_date       : Date
});

let updateListData = new mongoose.Schema({
    update_date     : Date,
    update_descript : String
});

let fundraiserSchema = new mongoose.Schema({
    fund_name       : String,
    fund_title      : String,
    fund_description: String,
    fund_image      : String,
    fund_createDate : Date,
    fund_moneytraget: Number,
    fund_moneynow   : Number,
    fundHistory     : [donateListData],
    fundUpdate      : [updateListData],
    fund_author     : String,
    adminConfirm    : Boolean
});

module.exports = mongoose.model('Fundraiser', fundraiserSchema);