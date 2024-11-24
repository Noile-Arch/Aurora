const mongoose = require('mongoose');

const paymentLogSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  mpesaReceiptNumber: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transactionDate: {
    type: Date,
    required: true
  },
  resultCode: {
    type: Number,
    required: true
  },
  resultDesc: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    required: true
  },
  rawCallback: {
    type: Object  // Stores the complete M-Pesa callback data
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PaymentLog', paymentLogSchema);