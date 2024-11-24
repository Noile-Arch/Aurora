const Order = require('../../models/orders/orderModel');
const PaymentLog = require('../../models/payments/paymentLogModel');
const MpesaService = require('../../services/mpesa.service');

exports.simulatePayment = async (req, res) => {
  try {
    const { phoneNumber, amount, orderId } = req.body;

    if (!phoneNumber || !amount || !orderId) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone number, amount and orderId are required'
      });
    }

    // Verify order exists and is pending payment
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    if (order.status !== 'pending_payment') {
      return res.status(400).json({
        status: 'error',
        message: 'Order is not pending payment'
      });
    }

    // Format phone number to ensure it starts with 254
    const formattedPhone = phoneNumber.toString().replace(/^\+?254?0?/, '254');
    
    console.log('Initiating payment for:', {
      phoneNumber: formattedPhone,
      amount: amount,
      orderId: orderId
    });
    
    // Initiate STK Push
    const result = await MpesaService.initiateSTKPush(
      formattedPhone,
      amount,
      orderId
    );

    if (!result) {
      throw new Error('Failed to initiate M-Pesa payment');
    }

    res.status(200).json({
      status: 'success',
      data: {
        ...result,
        orderId
      }
    });

  } catch (error) {
    console.error('Payment simulation error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to initiate M-Pesa payment'
    });
  }
};

exports.mpesaCallback = async (req, res) => {
  try {
    const { Body } = req.body;
    const { stkCallback } = Body;
    const { ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    // Find order by checking AccountReference in the callback
    const orderId = stkCallback.AccountReference.replace('ORDER', '');
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    if (ResultCode === 0) {
      // Payment successful
      order.status = 'processing';
      order.payment.status = 'completed';
      // Extract payment details from CallbackMetadata
      const metadata = CallbackMetadata.Item.reduce((acc, item) => {
        acc[item.Name] = item.Value;
        return acc;
      }, {});
      
      order.payment.mpesaReceiptNumber = metadata.MpesaReceiptNumber;
      order.payment.transactionDate = new Date();
      order.payment.transactionAmount = metadata.Amount;
    } else {
      // Payment failed
      order.payment.status = 'failed';
    }

    await order.save();

    res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    res.status(500).json({ ResultCode: 1, ResultDesc: error.message });
  }
};

// Get all payment logs (admin only)
exports.getPaymentLogs = async (req, res) => {
  try {
    const logs = await PaymentLog.find()
      .populate('orderId')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: logs.length,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get payment by receipt number
exports.getPaymentByReceipt = async (req, res) => {
  try {
    const { receiptNumber } = req.params;
    
    const payment = await PaymentLog.findOne({
      mpesaReceiptNumber: receiptNumber
    }).populate('orderId');

    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: 'Payment not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};


