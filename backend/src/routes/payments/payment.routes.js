const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middlewares/authenticate-access-token');
const {
  mpesaCallback,
  getPaymentLogs,
  getPaymentByReceipt,
  simulatePayment
} = require('../../controllers/payment/payment.controller');

router.post('/mpesa-callback', mpesaCallback);

router.use(protect);

router.get('/logs', authorize('admin'), getPaymentLogs);
router.get('/receipt/:receiptNumber', authorize('admin'), getPaymentByReceipt);
router.post('/simulate', simulatePayment);

module.exports = router;
