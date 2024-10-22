const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Get Categories
router.get('/', categoryController.getAllCategories);

module.exports = router;
