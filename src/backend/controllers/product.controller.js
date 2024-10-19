const Product = require('../models/product.model');
const Shop = require('../models/shop.model');
const User = require('../models/user.model');

// Add New Product
exports.addProduct = async (req, res) => {
  const { name, price, description, linkedShopId, pictures, quantity, category } = req.body;

  try {
    const linkedShop = await Shop.findById(linkedShopId);
    if (!linkedShop) {
      return res.status(404).json({ error: 'Linked shop not found' });
    }

    const product = new Product({
      name,
      price,
      description,
      linkedShop: linkedShopId,
      pictures,
      quantity,
      category,
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;

  try {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    for (const key in updates) {
      if (existingProduct[key] !== undefined) {
        existingProduct[key] = updates[key];
      }
    }

    await existingProduct.validate();

    existingProduct.availability = existingProduct.quantity > 0;

    await existingProduct.save();

    res.status(200).json({ message: 'Product updated successfully', updatedProduct: existingProduct });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};

// Get Product Details
exports.getProductDetails = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user ? req.user.id : null;

  try {
    const product = await Product.findById(productId).populate('linkedShop');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let isWishlisted = false;
    if (userId) {
      const user = await User.findById(userId);
      isWishlisted = user.wishlist.includes(productId);
    }

    const productDetails = {
      name: product.name,
      price: product.price,
      description: product.description,
      linkedShop: product.linkedShop,
      pictures: product.pictures,
      category: product.category,
      availability: product.availability,
      isWishlisted,
    };

    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product details' });
  }
};

// Get Products of a shop
exports.getProductsByShop = async (req, res) => {
  const { shopName } = req.params;

  try {
    const products = await Product.find({ shopName }); // MongoDB query

    if (products.length === 0) {
      return res.status(404).json({ message: `No products found for shop: ${shopName}` });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
