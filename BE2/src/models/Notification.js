const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
    // Người nhận thông báo (VD: Chủ bài viết)
  },
  senderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null
    
  },
  type: { 
    type: String, 
    enum: ['like', 'comment', 'follow', 'system'], 
    required: true 
   
  },
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post',
    default: null
    // Dẫn link tới bài viết (nếu có)
  },
  message: { 
    type: String, 
    required: true 
    
  },
  isRead: { 
    type: Boolean, 
    default: false 
    // Trạng thái Đã đọc / Chưa đọc
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);