const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { 
    type: String, 
    required: true 
  }, // Liên kết với _id của bài viết
  userId: { 
    type: String, 
    required: true 
  }, // Liên kết với userId của người bình luận
  content: { 
    type: String, 
    required: true 
  }, // Nội dung bình luận
  isDeleted: { 
    type: Boolean, 
    default: false 
  } // Tính năng Xóa mềm: true là bị Admin ẩn
}, {
  timestamps: true, // Tự động có createdAt và updatedAt
});

// Chú ý: Đặt tên model là 'Comment', Mongoose sẽ tự tạo collection 'comments'
module.exports = mongoose.model('Comment', commentSchema);