const Transaction = require('../models/Transaction');
const Voucher = require('../models/Voucher');

exports.makeRedemption = async (req, res) => {
  try {
    const { customerId, vouchers } = req.body;

    let totalPoints = 0;
    for (const { voucherId, quantity } of vouchers) {
      const voucher = await Voucher.findById(voucherId);
      if (!voucher) throw new Error('Voucher not found');
      totalPoints += voucher.costInPoints * quantity;
    }

    const transaction = new Transaction({
      customerId,
      vouchers,
      totalPointsSpent: totalPoints,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTransactionDetail = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.query.transactionId).populate('vouchers.voucher');
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
