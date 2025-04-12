const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: 'Payment',
    required: false
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: Schema.Types.ObjectId,
    ref: 'OrderStatus',
  },
  orderItems: [{
    type: Schema.Types.ObjectId,
    ref: 'OrderItem',
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
