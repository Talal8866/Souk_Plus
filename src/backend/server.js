require('dotenv').config({ path: "./src/backend/config/.env" });
<<<<<<< HEAD
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
=======
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
>>>>>>> 56e7f94a71e014bfeef9900f95ee05e017ff0687

const userRoutes = require('./routes/user.routes');
const shopRoutes = require('./routes/shop.routes');
const productRoutes = require('./routes/product.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const categoryRoutes = require('./routes/category.routes');
const cartRoutes = require('./routes/cart.routes');

const app = express();
<<<<<<< HEAD

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
=======
const PORT = process.env.PORT;

// CORS Options
const corsOptions = {
  origin: 'https://localhost:4200',
  credentials: true,
>>>>>>> 56e7f94a71e014bfeef9900f95ee05e017ff0687
};

app.use(cors(corsOptions));

<<<<<<< HEAD
const PORT = process.env.PORT;

=======
>>>>>>> 56e7f94a71e014bfeef9900f95ee05e017ff0687
// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

//Routes
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
