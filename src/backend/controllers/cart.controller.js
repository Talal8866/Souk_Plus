const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

// Add a product to the cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          quantity,
          name: product.name,
          category: product.category,
          picture: product.picture,
          price: product.price,
        });
      }
      await cart.save();
    } else {
      const newCart = new Cart({
        userId,
        products: [{
          productId,
          quantity,
          name: product.name,
          category: product.category,
          picture: product.picture,
          price: product.price,
        }],
      });
      await newCart.save();
    }

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding product to cart' });
  }
};

// View the cart
exports.viewCart = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const totalPrice = cart.products.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    const populatedProducts = cart.products.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      name: item.productId.name,
      category: item.productId.category,
      picture: item.productId.pictures[0],
      price: item.productId.price
    }));

    res.status(200).json({ products: populatedProducts, totalPrice });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

// Update product quantity in the cart
exports.updateCartQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Quantity updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating quantity' });
  }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing product from cart' });
  }
};
