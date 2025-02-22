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
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  orderStatus: {
    type: Schema.Types.ObjectId,
    ref: 'OrderStatus'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
