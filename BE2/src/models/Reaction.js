const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['like', 'love', 'haha', 'sad'], // Nếu chỉ có nút Like thì bỏ enum này đi
    default: 'like' 
  }
}, {
  timestamps: true
});


// Dòng này bắt buộc 1 User chỉ được thả 1 reaction trên 1 Bài viết
reactionSchema.index({ userId: 1, postId: 1 }, { unique: true });

module.exports = mongoose.model('Reaction', reactionSchema);