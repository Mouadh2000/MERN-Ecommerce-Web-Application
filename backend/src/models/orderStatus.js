const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderStatusSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  deliveryPerson: {
    type: Schema.Types.ObjectId,
    ref: 'Delivery',
    default: null
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

orderStatusSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);
module.exports = OrderStatus;
