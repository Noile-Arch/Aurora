const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middlewares/authenticate-access-token');
const {
  mpesaCallback,
  checkPaymentStatus,
  initiatePayment,
//   getAllPayments
} = require('../../controllers/payment/payment.controller'); // Make sure this path is correct

// Public route - M-Pesa callback URL (no authentication needed)
router.post('/mpesa-callback', mpesaCallback);

// Protected routes
// Protected routes
router.use(protect);


router.get('/logs', authorize('admin'), getPaymentLogs);
router.get('/receipt/:receiptNumber', authorize('admin'), getPaymentByReceipt);
router.post('/simulate', simulatePayment);

// Admin routes
router.use(authorize('admin'));
// router.get('/all', getAllPayments);

module.exports = router;