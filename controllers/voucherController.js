const Voucher = require('../models/Voucher');

exports.createVoucher = async (req, res) => {
  try {
    const voucher = new Voucher(req.body);
    await voucher.save();
    res.status(201).json(voucher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.query.id).populate('brand');
    if (!voucher) return res.status(404).json({ message: 'Voucher not found' });
    res.json(voucher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getVouchersByBrand = async (req, res) => {
  try {
    const vouchers = await Voucher.find({ brand: req.query.id });
    res.json(vouchers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
