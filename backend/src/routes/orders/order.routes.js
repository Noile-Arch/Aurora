const express = require('express');
const { protect, authorize } = require('../../middlewares/authenticate-access-token');
const {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require('../../controllers/orders/order.controller');
const { mpesaCallback } = require('../../controllers/payment/payment.controller');

const router = express.Router();

router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getOrders);

// Admin routes
router.get('/all', authorize('admin'), getAllOrders);
router.patch('/:id/status', authorize('admin'), updateOrderStatus);

// M-Pesa callback route (public)
router.post('/mpesa/callback', mpesaCallback);

router.post('/:id/cancel', protect, cancelOrder);

module.exports = router;
