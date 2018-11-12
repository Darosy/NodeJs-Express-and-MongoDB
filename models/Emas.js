var mongoose = require('mongoose');

var EmasSchema = new mongoose.Schema({
    vendor: String,
    tgl_berlaku: { type: Date, default: Date.now() },
    jenis_harga: String,
})
module.exports = EmasSchema;