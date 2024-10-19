const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Shop = require('../models/shop.model');
const Product = require('../models/product.model');


// Registeration
exports.registerShop = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    address,
    phoneNumber,
    shopCategory,
    description,
    socialMediaLinks,
    logo,
    owners,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(400).json({ error: 'Email is already registered!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const shop = new Shop({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      shopCategory,
      description,
      socialMediaLinks,
      logo,
      owners,
    });

    await shop.save();

    const token = jwt.sign({ id: shop._id, type: 'shop'}, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, message: 'Shop registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering shop' });
  }
};

// Login
exports.loginShop = async (req, res) => {
  const { email, password } = req.body;

  try {
    const shop = await Shop.findOne({ email });
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    const isMatch = await bcrypt.compare(password, shop.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: shop._id, type: 'shop'}, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Get All Shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shops' });
  }
};

// Rate Shop
exports.rateShop = async (req, res) => {
  const { shopId, rating } = req.body;

  if (rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 0 and 5' });
  }

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    shop.ratings.push(rating);
    shop.calculateAverageRating();
    await shop.save();

    res.status(200).json({ message: 'Shop rated successfully', averageRating: shop.averageRating });
  } catch (error) {
    res.status(500).json({ error: 'Error rating shop' });
  }
};

// Get Public Shop Profile
exports.getPublicProfile = async (req, res) => {
  const { shopId } = req.params;

  try {
    const shop = await Shop.findById(shopId).populate('products');
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    const shopProfile = {
      name: shop.name,
      rating: shop.averageRating,
      description: shop.description,
      category: shop.shopCategory,
      phoneNumber: shop.phoneNumber,
      email: shop.email,
      owners: shop.owners,
      products: shop.products,
    };

    res.status(200).json(shopProfile);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shop profile' });
  }
};

// Get Current Shop Profile
exports.getShopProfile = async (req, res) => {
  const shopId = req.id;

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shop profile' });
  }
};
