const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, name, email, phone, password } = req.body;
    let userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ message: 'ইউজারনেম বা ইমেইল অলরেডি ব্যবহৃত হয়েছে!' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, name, email, phone, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'রেজিস্ট্রেশন সফল হয়েছে!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { userOrEmail, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: userOrEmail }, { username: userOrEmail }]
    });
    if (!user) return res.status(400).json({ message: 'ইউজার পাওয়া যায়নি!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'ভুল পাসওয়ার্ড!' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Get All Students (For Admin)
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
