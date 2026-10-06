const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'repomind_super_secret_jwt_key_2026';

// In-Memory User Store Fallback when MongoDB is not active locally
const inMemoryUsers = new Map();

// Helper to sanitize user output (never return passwordHash)
const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.passwordHash;
  return obj;
};

// 1. POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'Senior Architect', plan = 'Pro Plan', phoneNumber = '+91 98765 43210' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let newUser;
    try {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        return res.status(400).json({ error: 'An account with this email already exists.' });
      }

      newUser = await User.create({
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        phoneNumber,
        role,
        plan
      });
    } catch (dbErr) {
      // In-Memory Fallback if MongoDB is not connected
      if (inMemoryUsers.has(cleanEmail)) {
        return res.status(400).json({ error: 'An account with this email already exists.' });
      }

      newUser = {
        _id: 'usr_' + Date.now(),
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        phoneNumber,
        role,
        plan,
        createdAt: new Date().toISOString()
      };
      inMemoryUsers.set(cleanEmail, newUser);
    }

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const safeUser = sanitizeUser(newUser);

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
});

// 2. POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    let userFound = null;

    try {
      userFound = await User.findOne({ email: cleanEmail });
    } catch (dbErr) {
      userFound = inMemoryUsers.get(cleanEmail);
    }

    if (!userFound && inMemoryUsers.has(cleanEmail)) {
      userFound = inMemoryUsers.get(cleanEmail);
    }

    if (!userFound) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, userFound.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { userId: userFound._id, email: userFound.email, role: userFound.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const safeUser = sanitizeUser(userFound);

    return res.json({
      message: 'Login successful',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

// 3. GET /api/auth/me - Session Restoration on Page Refresh
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided.' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired session token.' });
    }

    let userFound = null;
    try {
      userFound = await User.findById(decoded.userId);
    } catch (dbErr) {
      userFound = inMemoryUsers.get(decoded.email);
    }

    if (!userFound && inMemoryUsers.has(decoded.email)) {
      userFound = inMemoryUsers.get(decoded.email);
    }

    if (!userFound) {
      return res.status(404).json({ error: 'User session not found.' });
    }

    const safeUser = sanitizeUser(userFound);
    return res.json({
      user: safeUser,
      token
    });
  } catch (err) {
    console.error('Me endpoint error:', err);
    return res.status(500).json({ error: 'Server error verifying session.' });
  }
});

// 4. POST /api/auth/logout
router.post('/logout', (req, res) => {
  return res.json({ message: 'Session invalidated. Logged out successfully.' });
});

module.exports = router;
