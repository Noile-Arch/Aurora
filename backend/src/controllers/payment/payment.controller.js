const Order = require('../../models/orders/orderModel');
const PaymentLog = require('../../models/payments/paymentLogModel');
const MpesaService = require('../../services/mpesa.service');

exports.simulatePayment = async (req, res) => {
    try {
      const { phoneNumber, amount } = req.body;

      if (!phoneNumber || !amount) {
        return res.status(400).json({
          status: 'error',
          message: 'Phone number and amount are required'
        });
      }
      const formattedPhone = phoneNumber.toString().replace(/^\+|^0/, '');
      
      console.log('Initiating payment for:', {
        phoneNumber: formattedPhone,
        amount: amount
      });
      
      const response = await MpesaService.initiateSTKPush(
        formattedPhone,
        amount,
        'TEST' + Date.now()
      );
  
      res.status(200).json({
        status: 'success',
        message: 'STK push initiated',
        data: response
      });
    } catch (error) {
      console.error('Payment simulation error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message || 'Payment simulation failed'
      });
    }
  };

exports.mpesaCallback = async (req, res) => {
  try {
    console.log('M-Pesa callback received:', JSON.stringify(req.body, null, 2));
    
    const { Body: { stkCallback } } = req.body;
    const { 
      MerchantRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata 
    } = stkCallback;

    const orderId = MerchantRequestID.replace('TEST', '');

    if (ResultCode === 0) {
      // Extract payment details
      const amount = CallbackMetadata.Item.find(item => item.Name === 'Amount').Value;
      const mpesaReceiptNumber = CallbackMetadata.Item.find(item => item.Name === 'MpesaReceiptNumber').Value;
      const transactionDate = CallbackMetadata.Item.find(item => item.Name === 'TransactionDate').Value;
      const phoneNumber = CallbackMetadata.Item.find(item => item.Name === 'PhoneNumber').Value;
      
      // Format date
      const formattedDate = new Date(
        transactionDate.toString().replace(
          /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
          '$1-$2-$3T$4:$5:$6'
        )
      );

      // Create payment log
      await PaymentLog.create({
        orderId,
        mpesaReceiptNumber,
        phoneNumber: phoneNumber.toString(),
        amount,
        transactionDate: formattedDate,
        resultCode: ResultCode,
        resultDesc: ResultDesc,
        status: 'success',
        rawCallback: req.body
      });

      // Update order
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          'payment.status': 'completed',
          'payment.mpesaReceiptNumber': mpesaReceiptNumber,
          'payment.transactionDate': formattedDate,
          'payment.transactionAmount': amount,
          'status': 'processing'
        },
        { new: true }
      );

      if (!updatedOrder) {
        console.error('Order not found:', orderId);
        return res.status(404).json({
          status: 'error',
          message: 'Order not found'
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Payment processed successfully',
        data: {
          orderId,
          mpesaReceiptNumber,
          amount,
          transactionDate: formattedDate
        }
      });
    } else {
      // Log failed payment
      await PaymentLog.create({
        orderId,
        resultCode: ResultCode,
        resultDesc: ResultDesc,
        status: 'failed',
        rawCallback: req.body,
        phoneNumber: req.body.Body?.stkCallback?.CallbackMetadata?.Item?.find(
          item => item.Name === 'PhoneNumber'
        )?.Value?.toString() || 'N/A',
        amount: req.body.Body?.stkCallback?.CallbackMetadata?.Item?.find(
          item => item.Name === 'Amount'
        )?.Value || 0,
        transactionDate: new Date(),
        mpesaReceiptNumber: 'FAILED_TRANSACTION'
      });

      // Update order status
      await Order.findByIdAndUpdate(
        orderId,
        {
          'payment.status': 'failed',
          status: 'cancelled'
        }
      );

      res.status(200).json({
        status: 'failed',
        message: ResultDesc,
        data: {
          orderId,
          resultCode: ResultCode
        }
      });
    }
  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process payment callback'
    });
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


