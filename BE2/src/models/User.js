const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // BẮT BUỘC PHẢI CÓ DÒNG NÀY
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  roleId: {
  type: String, // Liên kết với _id của bảng Role
  default: "ID_CỦA_QUYỀN_USER_MẶC_ĐỊNH" // Tốt nhất nên để mặc định ai tạo tài khoản cũng là User bình thường
  },
  role: {
    type: String,
    enum: ['user', 'mod', 'admin'], // Tùy chọn: Ép chỉ được nhập 3 chữ này
    default: 'user'
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema, 'users');