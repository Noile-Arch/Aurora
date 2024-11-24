const Order = require('../../models/orders/orderModel');
const MpesaService = require('../../services/mpesa.service');

exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, phoneNumber, specialInstructions } = req.body;

    // Calculate total amount including shipping
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 500;

    // Create order with initial status
    const order = await Order.create({
      user: req.user._id,
      items: items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount,
      deliveryAddress,
      specialInstructions,
      status: 'pending_payment',
      payment: {
        phoneNumber,
        status: 'pending'
      }
    });

    // Populate product details
    await order.populate('items.product');

    res.status(201).json({
      status: 'success',
      data: {
        order
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to create order'
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Admin only
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Only allow cancellation of pending orders
    if (order.status !== 'pending_payment') {
      return res.status(400).json({
        status: 'error',
        message: 'Only pending orders can be cancelled'
      });
    }

    order.status = 'cancelled';
    order.payment.status = 'cancelled';
    order.cancelledAt = new Date();
    await order.save();

    res.status(200).json({
      status: 'success',
      data: {
        order
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
