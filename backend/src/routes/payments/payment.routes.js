const express = require('express');
const router = express.Router();
const { simulatePayment, mpesaCallback } = require('../../controllers/payment/payment.controller');

router.post('/simulate-payment', simulatePayment);
router.post('/mpesa-callback', mpesaCallback);

module.exports = router;
