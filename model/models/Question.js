const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  ref: { type: String, required: true },
  question: { type: String, required: true },
  hint: { type: String, default: '' },
  answer: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
