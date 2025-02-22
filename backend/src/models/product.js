const mongoose = require('mongoose');
const Category = require('./category');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  updatedPrice: {
    type: Number,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  stock_quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre('save', async function (next) {
  if (this.category) {
    try {
      const category = await Category.findById(this.category);
      if (!category) {
        return next(new Error('Category not found'));
      }
    } catch (error) {
      return next(new Error('Error checking category: ' + error.message));
    }
  }

  this.updated_at = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;