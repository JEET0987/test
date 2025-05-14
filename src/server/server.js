const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});

// Database connection
mongoose.connect('mongodb+srv://anitabhavsar:vrhZZJILwJDgaUco@bcb.u01ogc5.mongodb.net/?retryWrites=true&w=majority&appName=BCB', {
  // useNewUrlParser and useUnifiedTopology options are deprecated in mongoose 6+
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/api/auth/auth'));
app.use('/api/auth/products', require('./routes/api/auth/products'));
app.use('/api/auth/cart', require('./routes/api/auth/cart'));
app.use('/api/auth/orders', require('./routes/api/auth/orders'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 