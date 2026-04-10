const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['user',  'admin'], 
    default: 'user'
  },
  email: {
  type: String,
  required: [true, 'Email is required'],
  unique: true,      
  lowercase: true,   
  trim: true
  },
password: {
    type: String,
    
    default:''
  },
  avatar: {
    type: String,
    default: 'https://i.pravatar.cc/150' // Ảnh mặc định nếu user chưa tải lên
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema, 'users');