const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true // Dành cho URL 
  },
  description: { 
    type: String, 
    default: "" // Admin có thể thêm mô tả cho tag này
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tag', tagSchema);