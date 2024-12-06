const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  costInPoints: { type: Number, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
});

module.exports = mongoose.model('Voucher', voucherSchema);
