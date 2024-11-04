const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const tokenInfo = require('../middlewares/extractTokenInfo.middleware');
const upload = require('../middlewares/upload.middleware');

// Add or Update Product
router.post('/', authenticateToken, upload.single('picture'), productController.addOrUpdateProduct);

// Delete Current Product
router.delete('/:productId', authenticateToken, productController.deleteProduct);

// Get Current Product Details
router.get('/:productId', tokenInfo, productController.getProductDetails)

// Get All Products of a Shop
router.get('/:shopName', productController.getProductsByShop);

// Get Products By Category
router.get('/list/:category', productController.getProductsByCategory);

// Get Featured Products
router.get('/featured', productController.getFeaturedProducts);

module.exports = router;
