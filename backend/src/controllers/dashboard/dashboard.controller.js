const Order = require('../../models/orders/orderModel');
const Product = require('../../models/products/productModel');
const PaymentLog = require('../../models/payments/paymentLogModel');

exports.getDashboardMetrics = async (req, res) => {
  try {
    
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $match: {
          'payment.status': 'completed'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    const totalProducts = await Product.countDocuments();

    const recentPayments = await PaymentLog.find()
      .sort('-createdAt')
      .limit(5);

    const recentOrders = await Order.find()
      .sort('-createdAt')
      .limit(5);

    const salesData = await Order.aggregate([
      {
        $match: {
          'payment.status': 'completed'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          amount: { $sum: '$totalAmount' }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: 7
      },
      {
        $project: {
          date: '$_id',
          amount: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalOrders,
        totalRevenue,
        pendingOrders,
        totalProducts,
        recentPayments,
        recentOrders,
        salesData
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
