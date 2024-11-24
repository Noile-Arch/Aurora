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
    postalCode: String
  },
  status: {
    type: String,
    enum: ['pending_payment', 'processing', 'completed', 'cancelled'],
    default: 'pending_payment'
  },
  payment: {
    phoneNumber: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled'],
      default: 'pending'
    }
  },
  specialInstructions: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
