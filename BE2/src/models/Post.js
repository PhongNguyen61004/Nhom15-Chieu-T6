const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  // Chuyển từ kiểu String sang ObjectId và đổi tên thành authorId
  authorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User' 
  },
  title: { type: String, required: true },
  slug: { type: String, unique: true }, 
  content: { type: String, required: true },
  
  
  coverImage: { type: String, default: "" },
  
  
  tags: [{ type: String }], 
  
  status: { 
    type: String, 
    enum: ['published', 'draft', 'pending'], 
    default: 'published' 
  },
  
  // Thêm các trường thống kê mới
  readingTime: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  bookmarksCount: { type: Number, default: 0 },
  publishedAt: { type: Date },
  isDeleted: { type: Boolean, default: false },
  
  // phân quyền public/private
  visibility: { type: String, enum: ['public', 'private'], default: 'public' }

}, {
  timestamps: true, 
});

module.exports = mongoose.model('Post', postSchema, 'posts');