const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop.controller');
const authenticateToken = require('../middleware/auth.middleware');
const userTypeValidator = require('../middleware/userTypeValidator.middleware');

// Shops Registration
router.post('/register', shopController.registerShop);

// Shops Login
router.post('/login', shopController.loginShop);

// Get Shops List
router.get('/', shopController.getAllShops);

// Rate Shop
router.post('/rate', authenticateToken, shopController.rateShop);

// Get Public Shop Profile
router.get('/:shopId', shopController.getPublicProfile);

// Get Current Shop Profile
router.get('/profile', authenticateToken, userTypeValidator('shop'), shopController.getShopProfile);

module.exports = router;
