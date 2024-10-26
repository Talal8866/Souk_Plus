const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Shop = require('../models/shop.model');

// Middleware to Authenticate Token and Validate Token Version
const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied, token missing.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { type, userId, shopId, version } = decoded;

    let userOrShop;

    if (type === 'user') {
      userOrShop = await User.findById(userId);
    } else if (type === 'shop') {
      userOrShop = await Shop.findById(shopId);
    }

    if (!userOrShop || userOrShop.tokenVersion !== version) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.type = type;

    next();

  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
