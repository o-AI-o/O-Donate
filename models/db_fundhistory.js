const mongoose      = require("mongoose");

let fundhistorySchema = new mongoose.Schema({
    funh_id         : Number,
    funh_userid     : Number,
    funh_fundid     : Number,
    funh_value      : Number,
    funh_date       : Date,
    funh_time       : TimeRanges
});