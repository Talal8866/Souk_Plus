const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Ibra:1234@online-store-dev.d2u6t.mongodb.net/?retryWrites=true&w=majority&appName=ONLINE-STORE-DEV')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Sample Route
app.get('/', (req, res) => {
    res.send('Online Stores Server!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
