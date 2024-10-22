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
    type: mongoose.Schema.Types.ObjectId, // Reference to the Shop model
    ref: 'Shop',
    required: true,
  },
  pictures: {
    type: [String], // Array to store URLs or file paths for product images
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true, //Updated based on quantity
  },
});

productSchema.pre('save', function(next) {
  this.availability = this.quantity > 0;
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
