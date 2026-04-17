const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  
  postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, 
  
  
  parentId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'Comment' }, 
  content: { type: String, required: true },
  likesCount: { type: Number, default: 0 },
  isEdited: { type: Boolean, default: false },
  depth: { type: Number, default: 0 },
  
  
  isDeleted: { type: Boolean, default: false } 
}, {
  timestamps: true 
});

module.exports = mongoose.model('Comment', commentSchema);