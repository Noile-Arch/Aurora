const Order = require('../../models/orders/orderModel');
const PaymentLog = require('../../models/payments/paymentLogModel');
const MpesaService = require('../../services/mpesa.service');
const Payment = require('../../models/payments/paymentLogModel');

<<<<<<< HEAD
exports.simulatePayment = async (req, res) => {
  try {
    const { phoneNumber, amount, orderId } = req.body;
=======
exports.initiatePayment = async (req, res) => {
    try {
      const { phoneNumber, amount } = req.body;
>>>>>>> 25c41eb (feat: implement admin dashboard - view orders)

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
<<<<<<< HEAD
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
=======
    console.log('M-Pesa callback received:', JSON.stringify(req.body, null, 2));

    // Validate callback data
    if (!req.body || !req.body.Body || !req.body.Body.stkCallback) {
      console.warn('Invalid callback data received');
      return res.json({
        ResultCode: 0,
        ResultDesc: "Success" // Always return success to M-Pesa
      });
    }

    const { Body: { stkCallback } } = req.body;
    const { ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    // Log the callback details
    console.log('STK Callback Details:', {
      ResultCode,
      ResultDesc,
      CallbackMetadata
    });

    // Handle successful payment
    if (ResultCode === 0 && CallbackMetadata && CallbackMetadata.Item) {
      const amount = CallbackMetadata.Item.find(item => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = CallbackMetadata.Item.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const transactionDate = CallbackMetadata.Item.find(item => item.Name === 'TransactionDate')?.Value;
      const phoneNumber = CallbackMetadata.Item.find(item => item.Name === 'PhoneNumber')?.Value;
      const merchantRequestID = stkCallback.MerchantRequestID;

      // Validate required fields
      if (!amount || !mpesaReceiptNumber || !transactionDate || !phoneNumber) {
        console.error('Missing required payment details in callback');
        return res.json({
          ResultCode: 0,
          ResultDesc: "Success"
        });
      }

      // Find the order using merchantRequestID
      const order = await Order.findOne({ 'payment.merchantRequestID': merchantRequestID });
      
      if (!order) {
        console.error('Order not found for merchantRequestID:', merchantRequestID);
        return res.json({
          ResultCode: 0,
          ResultDesc: "Success"
        });
      }

      // Create payment record
      const payment = await Payment.create({
        orderId: order._id,
        amount,
        mpesaReceiptNumber,
        phoneNumber: phoneNumber.toString(),
        transactionDate: transactionDate.toString(),
        status: 'completed',
        merchantRequestID
      });

      // Update order payment status
      await Order.findByIdAndUpdate(order._id, {
        'payment.status': 'completed',
        'payment.mpesaReceiptNumber': mpesaReceiptNumber,
        'payment.transactionDate': transactionDate,
        status: 'processing' // Update order status to processing
      });

      console.log('Payment processed successfully:', payment);
    } else {
      console.log('Payment failed or cancelled:', ResultDesc);
      
      // If we have MerchantRequestID, update the order status
      if (stkCallback.MerchantRequestID) {
        const order = await Order.findOne({ 'payment.merchantRequestID': stkCallback.MerchantRequestID });
        if (order) {
          await Order.findByIdAndUpdate(order._id, {
            'payment.status': 'failed',
            'payment.failureReason': ResultDesc
          });
        }
      }
    }

    // Always return success to M-Pesa
    res.json({
      ResultCode: 0,
      ResultDesc: "Success"
    });
  } catch (error) {
    console.error('Callback processing error:', error);
    // Always return success to M-Pesa even if we have internal errors
    res.json({
      ResultCode: 0,
      ResultDesc: "Success"
    });
>>>>>>> 25c41eb (feat: implement admin dashboard - view orders)
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

// Add payment status check endpoint
exports.checkPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    const payment = await Payment.findOne({ orderId });

    res.json({
      status: 'success',
      data: {
        paymentStatus: order.payment.status,
        mpesaReceiptNumber: order.payment.mpesaReceiptNumber,
        payment: payment || null
      }
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check payment status'
    });
  }
};


