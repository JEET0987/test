const express = require('express');
const router = express.Router();
const { auth } = require('../../../middleware/auth');

// Use separated register and login routers
router.use('/register', require('./register'));
router.use('/login', require('./login'));

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

module.exports = router; 