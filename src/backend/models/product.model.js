const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  linkedShop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
