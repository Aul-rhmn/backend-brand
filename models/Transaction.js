const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  vouchers: [
    {
      voucher: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPointsSpent: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
