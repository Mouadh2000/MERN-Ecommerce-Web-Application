const OrderController = require('../base/orderController');
const Order = require('../../models/order');
const OrderStatus = require('../../models/orderStatus');
const OrderItem = require('../../models/orderItem');

class AdminOrderController extends OrderController {
  async handleRequest(req, res) {
    try {
      const orders = await Order.find()
        .select('-__v -updatedAt')
        .populate({
          path: 'client',
          select: 'phoneNumber email',
        })
        .populate({
          path: 'payment',
          select: 'name transactionId paymentDate',
          populate: {
            path: 'paymentMethod',
            select: 'name -_id',
            model: 'PaymentMethod',
          }

        })
        .populate({
          path: 'orderStatus',
          select: 'status updatedAt' 
        })
        .populate({
          path: 'orderItems',
          select: 'quantity product', 
          populate: {
            path: 'product',
            select: 'name',
            model: 'Product'
          }
        })
        .sort({ createdAt: -1 })
        .lean();

      const cleanedOrders = orders.map(order => ({
        ...order,
      }));

      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully',
        data: cleanedOrders,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching orders',
        error: error.message,
      });
    }
  }

  async updateOrderStatus(req, res) {
    const { orderId, status } = req.body;
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      const validStatuses = ['Pending', 'Processing', 'Shipped', 'Cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order status',
        });
      }

      const orderStatus = await OrderStatus.create({
        order: orderId,
        status,
      });

      order.orderStatus = orderStatus._id;
      await order.save();

      return res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        data: {
          order,
          orderStatus,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error updating order status',
        error: error.message,
      });
    }
  }

  async getOrderById(req, res) {
    const { orderId } = req.params;
    try {
      const order = await Order.findById(orderId)
        .populate('client')
        .populate('payment')
        .populate('orderStatus')
        .populate({
          path: 'orderItems',
          populate: {
            path: 'product',
          },
        });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Order fetched successfully',
        data: order,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching order',
        error: error.message,
      });
    }
  }
  async getTotalOrderAmount(req, res) {
    try {
      const result = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$totalAmount" }
          }
        }
      ]);
  
      const total = result[0]?.totalAmount || 0;
  
      return res.status(200).json({
        success: true,
        message: 'Total order amount fetched successfully',
        data: {
          total
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching total order amount',
        error: error.message,
      });
    }
  }

  async getTotalSales(req, res) {
    try {
      const result = await OrderItem.aggregate([
        {
          $group: {
            _id: null,
            totalQuantity: { $sum: "$quantity" }
          }
        }
      ]);
  
      const totalQuantity = result[0]?.totalQuantity || 0;
  
      return res.status(200).json({
        success: true,
        message: 'Total order item quantity fetched successfully',
        data: {
          totalQuantity
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching total order item quantity',
        error: error.message,
      });
    }
  }

  async getMonthlyOrderTotals(req, res) {
    try {
      const result = await Order.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            totalAmount: { $sum: "$totalAmount" },
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            "_id.year": -1,
            "_id.month": -1
          }
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            totalAmount: 1,
            count: 1
          }
        }
      ]);
  
      return res.status(200).json({
        success: true,
        message: "Monthly total order amounts fetched successfully",
        data: result
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching monthly total order amounts",
        error: error.message
      });
    }
  }
  
  
  
}

module.exports = AdminOrderController;
