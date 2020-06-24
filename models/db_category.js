const   mongoose      = require("mongoose");

let categorySchema = new mongoose.Schema({
    catg_name       : String,
    catg_pic        : String,
    catg_detail     : String
});

module.exports = mongoose.model('Category', categorySchema);