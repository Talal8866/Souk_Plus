const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authenticateToken = require('../middleware/auth.middleware');

// Add Product To Current Shop
router.post('/', authenticateToken, productController.addProduct);

// Get All Products of a Shop
router.get('/:shopName', productController.getProductsByShop);

// Get Current Product Details
router.get('/:productId', authenticateToken, productController.getProductDetails);

// Update Current Product
router.put('/:productId', authenticateToken, productController.updateProduct);

// Delete Current Product
router.delete('/:productId', authenticateToken, productController.deleteProduct);

module.exports = router;
