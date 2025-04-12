const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
});

orderItemSchema.pre('save', async function(next) {
  try {
    const product = await mongoose.model('Product').findById(this.product);
    if (!product) {
      throw new Error('Product not found');
    }
    next();
  } catch (error) {
    next(error);
  }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;