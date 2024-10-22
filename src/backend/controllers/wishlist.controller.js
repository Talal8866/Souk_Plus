const User = require('../models/user.model');
const Product = require('../models/product.model');

// Add Product To Wishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const user = await User.findById(userId);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.status(200).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding product to wishlist' });
  }
};

// Get Wish List
exports.getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('wishlist');
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching wishlist' });
  }
};

// Remove Product from Wishlist
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing product from wishlist' });
  }
};
