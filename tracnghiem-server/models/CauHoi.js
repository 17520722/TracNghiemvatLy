const mongoose = require('mongoose');

const CauHoiSchema = new mongoose.Schema({
    noiDung: String,
    dapAn: [{type: String}],
    doKho: Number,
    dangToan: Number
});

module.exports = mongoose.model("CauHoi", CauHoiSchema);
