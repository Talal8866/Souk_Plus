require('dotenv').config({ path: "./src/backend/config/.env" });
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT;
const url = process.env.DB_URI;

// Connect to MongoDB
connectDB();

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
