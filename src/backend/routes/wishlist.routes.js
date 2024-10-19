const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const authenticateToken = require('../middleware/auth.middleware');

// Add Product to Wishlist
router.post('/add', authenticateToken, wishlistController.addToWishlist);

// Get Wishlist
router.get('/', authenticateToken, wishlistController.getWishlist);

module.exports = router;
