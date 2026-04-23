const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // Chú ý: Đổi từ 'password' thành 'passwordHash'
  name: { type: String },
  bio: { type: String },
  avatar: { type: String },
  location: { type: String },
  role: { type: String, default: 'user' },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false }, 
  
  createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', userSchema);