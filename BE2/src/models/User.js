const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { // THÊM TRƯỜNG NÀY
    type: Number, 
    required: true, 
    unique: true 
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema, 'User');