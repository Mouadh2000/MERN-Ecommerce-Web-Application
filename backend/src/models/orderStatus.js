const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderStatusSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Cancelled'],
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
