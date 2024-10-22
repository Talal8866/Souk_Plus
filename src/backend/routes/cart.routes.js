const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const auth = require('../middleware/auth.middleware');

// Add a product to the cart
router.post('/add', auth, cartController.addToCart);

// View the cart
router.get('/', auth, cartController.viewCart);

// Update product quantity in the cart
router.put('/update/:productId', auth, cartController.updateCartQuantity);

// Remove a product from the cart
router.delete('/remove/:productId', auth, cartController.removeFromCart);

module.exports = router;
