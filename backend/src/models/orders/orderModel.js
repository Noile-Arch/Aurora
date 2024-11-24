const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  payment: {
    phoneNumber: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    mpesaReceiptNumber: String,
    transactionDate: Date,
    transactionAmount: Number
  },
  specialInstructions: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
