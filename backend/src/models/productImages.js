const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productImageSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductImage = mongoose.model('ProductImage', productImageSchema);

module.exports = ProductImage;