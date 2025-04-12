const OrderController = require('../base/orderController');
const Order = require('../../models/order');
const OrderItem = require('../../models/orderItem');
const Payment = require('../../models/payment');
const Product = require('../../models/product');
const OrderStatus = require('../../models/orderStatus');

class ClientOrderController extends OrderController {

  async handleRequest(req, res) {
    const { clientId, items, totalAmount, paymentMethodId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must have at least one item',
      });
    }

    try {
      const order = new Order({
        client: clientId,
        totalAmount,
        orderItems: [], 
      });
      await order.save();

      const orderItemIds = [];
      
      for (const item of items) {
        const { productId, quantity } = item;
        const product = await Product.findById(productId);

        if (!product) {
          return res.status(400).json({
            success: false,
            message: `Product with ID ${productId} not found`,
          });
        }

        const orderItem = new OrderItem({
          order: order._id,
          product: productId,
          quantity,
        });
        await orderItem.save();
        
        orderItemIds.push(orderItem._id); 
      }

      order.orderItems = orderItemIds; 
      await order.save(); 

      const payment = new Payment({
        client: clientId,
        order: order._id,
        paymentMethod: paymentMethodId,
        amount: totalAmount,
        status: 'Pending',
      });
      await payment.save();

      const orderStatus = new OrderStatus({
        order: order._id,
        status: 'Pending',
      });
      await orderStatus.save();

      order.payment = payment._id;
      order.orderStatus = orderStatus._id;
      await order.save();

      const populatedOrder = await Order.findById(order._id)
        .populate('orderItems')
        .populate('payment')
        .populate('orderStatus');

      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: populatedOrder,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error creating order',
        error: error.message,
      });
    }
  }

  async getClientOrders(req, res) {
    const { clientId } = req.params;
  
    try {
      const orders = await Order.find({ client: clientId })
        .populate({
          path: 'orderItems',
          populate: { path: 'product', select: 'name' },
        })
        .populate('payment')
        .populate('orderStatus')
        .sort({ createdAt: -1 });
  
      const simplifiedOrders = orders.map(order => ({
        productNames: order.orderItems.map(item => item.product?.name || 'Unknown').join(', '),
        date: order.createdAt,
        itemsCount: order.orderItems.length,
        status: order.orderStatus?.status || 'N/A',
        amount: order.totalAmount,
      }));
  
      return res.status(200).json({
        success: true,
        message: 'Client orders fetched successfully',
        data: simplifiedOrders,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching client orders',
        error: error.message,
      });
    }
  }
  
}

module.exports = ClientOrderController;
