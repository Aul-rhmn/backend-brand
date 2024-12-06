const express = require('express');
const { createVoucher, getVoucher, getVouchersByBrand } = require('../controllers/voucherController');
const router = express.Router();

router.post('/voucher', createVoucher);
router.get('/voucher', getVoucher);
router.get('/voucher/brand', getVouchersByBrand);

module.exports = router;
