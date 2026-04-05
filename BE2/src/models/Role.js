const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  // Tên quyền (VD: 'admin', 'mod', 'user')
  roleName: { 
    type: String, 
    required: true, 
    unique: true 
  },
  // Mô tả để Admin dễ hiểu (VD: 'Quản trị viên tối cao')
  description: { 
    type: String 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);