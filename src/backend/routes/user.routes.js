const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/auth.middleware');
const userTypeValidator = require('../middleware/userTypeValidator.middleware');

// Users Registration
router.post('/register', userController.registerUser);

// Users Login
router.post('/login', userController.loginUser);

// Get Public User Profile
router.get('/:userId', userController.getPublicProfile);

// Get Current User Profile
router.get('/profile', authenticateToken, userTypeValidator('user'), userController.getUserProfile);

module.exports = router;
