var mongoose = require('mongoose');

var EmasDetSchema = new mongoose.Schema({
    id_emas: String,
    jenis_mulia: Number,
    harga: Number,
})
module.exports = EmasDetSchema;