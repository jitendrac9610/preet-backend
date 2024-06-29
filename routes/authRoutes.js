const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example protected route
router.get('/dashboard', authMiddleware, (req, res) => {
    res.send('Welcome to the dashboard');
});

module.exports = router;
