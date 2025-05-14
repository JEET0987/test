const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');

// Register new user
router.post('/', async (req, res) => {
  console.log('Register request body:', req.body);
  try {
    const { email, password, username, confirmPassword, userType } = req.body;
    const name = username; // Use username as name

    if (!name) {
      console.log('Validation failed: Name is required');
      return res.status(400).json({ message: 'Name is required' });
    }

    if (password !== confirmPassword) {
      console.log('Validation failed: Passwords do not match');
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Validation failed: User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const validRoles = ['user', 'admin', 'retail', 'wholesale'];
    const role = validRoles.includes(userType) ? userType : 'user';

    const user = new User({
      email,
      password,
      name,
      username,
      role
    });

    await user.save();
    console.log('User created successfully:', user.email);

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

module.exports = router; 