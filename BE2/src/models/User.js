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
// Trước khi lưu (save) một user mới vào database
userSchema.pre('save', async function (next) {
  const user = this;

  // Chỉ thực hiện nếu đây là user mới hoàn toàn
  if (user.isNew) {
    try {
      // Tìm người có id lớn nhất hiện tại
      const lastUser = await mongoose.model('User').findOne({}, {}, { sort: { 'id': -1 } });
      
      if (lastUser && lastUser.id) {
        // Nếu đã có người trước đó, id mới = id cũ + 1
        user.id = lastUser.id + 1;
      } else {
        // Nếu là người đầu tiên, id = 1
        user.id = 1;
      }
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
module.exports = mongoose.model('User', userSchema, 'User');