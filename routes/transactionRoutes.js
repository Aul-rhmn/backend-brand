const express = require('express');
const { makeRedemption, getTransactionDetail } = require('../controllers/transactionController');
const router = express.Router();

router.post('/transaction/redemption', makeRedemption);
router.get('/transaction/redemption', getTransactionDetail);

module.exports = router;
