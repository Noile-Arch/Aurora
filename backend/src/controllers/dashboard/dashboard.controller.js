const Product = require('../../models/products/productModel');
const Order = require('../../models/orders/orderModel');
const Payment = require('../../models/payments/paymentLogModel');

exports.getDashboardData = async (req, res) => {
  try {
    // Get total orders
    const totalOrders = await Order.countDocuments();
    
    // Get total revenue
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Get pending orders
    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    // Get completed orders
    const completedOrders = await Order.countDocuments({ status: 'completed' });

    // Get total products
    const totalProducts = await Product.countDocuments();

    // Get recent payments (last 5)
    const recentPayments = await Payment.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent orders (last 5)
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Get products
    const products = await Product.find()
      .sort({ createdAt: -1 });

    // Get sales data for chart (last 7 days)
    const salesData = await Payment.aggregate([
      {
        $match: {
          status: 'success',
          createdAt: { 
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
          }
        }
      },
      {
        $group: {
          _id: { 
            $dateToString: { 
              format: "%Y-%m-%d", 
              date: "$createdAt" 
            }
          },
          amount: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        pendingOrders,
        completedOrders,
        totalProducts,
        recentPayments,
        recentOrders,
        products,
        salesData: salesData.map(item => ({
          date: item._id,
          amount: item.amount
        }))
      }
    });

  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching dashboard data'
    });
  }
};
