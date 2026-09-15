const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Add Question
router.post('/add', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json({ message: 'প্রশ্ন সফলভাবে যুক্ত করা হয়েছে!', question: newQuestion });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Get Questions by Chapter
router.get('/:chapter', async (req, res) => {
  try {
    const questions = await Question.find({ chapter: req.params.chapter });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;