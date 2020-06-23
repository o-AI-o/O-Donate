const mongoose      = require("mongoose");

let fundhistorySchema = new mongoose.Schema({
    funh_userid     : String,
    funh_fundid     : String,
    funh_value      : Number,
    funh_date       : Date
});

module.exports = mongoose.model('FunHistory', fundhistorySchema);