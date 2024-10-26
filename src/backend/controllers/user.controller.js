const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

//Registration
exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    address,
    phoneNumber,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
    });

    await user.save();

    const token = jwt.sign({ id: user._id, type: 'user', version: user.tokenVersion }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, message: 'User registered and logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, type: 'user', version: user.tokenVersion }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Logout
exports.logoutUser = async (req, res) => {
try {
    await User.findByIdAndUpdate(req.user.id, { $inc: { tokenVersion: 1 } });
    res.status(200).json({ message: 'Logged user out successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed' });
  }
};

// Get Public Profile
exports.getPublicProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('wishlist');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = {
      name: user.name,
      email: user.email,
      address: user.address,
      wishlist: user.wishlist,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

// Get Current User Profile
exports.getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};
