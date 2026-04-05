const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  // Không khai báo 'id' nữa vì ta sẽ xài '_id' của MongoDB
  userId: { 
    type: String, // Trong ảnh đang là chuỗi "USER_ID_DUY"
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  thumbnail: { 
    type: String, // Link ảnh
    default: "" 
  },
  status: { 
    type: String, 
    enum: ['published', 'draft', 'pending'], // Chỉ cho phép các trạng thái này
    default: 'published' 
  },
  visibility: { 
    type: String, 
    enum: ['public', 'private'],
    default: 'public' 
  },
  viewCount: { 
    type: Number, 
    default: 0 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true, // Cái này sẽ tự động sinh ra createdAt và updatedAt như trong ảnh
});

// Chú ý: Đặt tên collection là 'Post' (hoặc tên tùy bạn đang đặt trong DB)
module.exports = mongoose.model('Post', postSchema, 'Post');