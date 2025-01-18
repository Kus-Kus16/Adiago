const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
        email,
        username,
        password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        res.json({ accessToken, refreshToken });

    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
    
});

router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    
    if (!refreshToken) {
        return res.status(400).json({ msg: 'Refresh token is required' });
    }
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: 'Invalid refresh token' });
        }
  
        const newAccessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  
        res.json({ accessToken: newAccessToken });
    });
});

router.get('/protected', verifyToken, async (req, res) => {
    return res.status(200).json({ user: req.user })
});

module.exports = router;