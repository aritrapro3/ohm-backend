const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  academicInfo: {
    college: { type: String, default: '' },
    group: { type: String, default: 'বিজ্ঞান' },
    batch: { type: String, default: 'এইচএসসি ২০২৭' },
    sscRoll: { type: String, default: '' },
    sscReg: { type: String, default: '' }
  },
  personalInfo: {
    dob: { type: String, default: '' },
    gender: { type: String, default: 'ছাত্র' },
    address: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
