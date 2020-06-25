const   mongoose      = require("mongoose");

let donateListData = new mongoose.Schema({
    historyID       : String
});

let updateListData = new mongoose.Schema({
    date            : Date,
    update_descript : String
});

let fundraiserSchema = new mongoose.Schema({
    fund_name       : String,
    fund_title      : String,
    fund_catg       : String,
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