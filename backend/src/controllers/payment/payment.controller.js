const Order = require('../../models/orders/orderModel');
const MpesaService = require("../../services/mpesa.service")


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

    // MerchantRequestID contains the order ID we passed during payment initiation
    const orderId = MerchantRequestID.replace('TEST', '');

    if (ResultCode === 0) {
      const amount = CallbackMetadata.Item.find(item => item.Name === 'Amount').Value;
      const mpesaReceiptNumber = CallbackMetadata.Item.find(item => item.Name === 'MpesaReceiptNumber').Value;
      const transactionDate = CallbackMetadata.Item.find(item => item.Name === 'TransactionDate').Value;
      
      // Convert the transaction date from format YYYYMMDDHHMMSS to Date object
      const formattedDate = new Date(
        transactionDate.toString().replace(
          /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
          '$1-$2-$3T$4:$5:$6'
        )
      );

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

      console.log('Payment processed successfully:', {
        orderId,
        mpesaReceiptNumber,
        amount
      });

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
      await Order.findByIdAndUpdate(
        orderId,
        {
          'payment.status': 'failed',
          status: 'cancelled'
        }
      );

      console.log('Payment failed:', {
        orderId,
        resultCode: ResultCode,
        resultDesc: ResultDesc
      });

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


