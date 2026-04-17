const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  followerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
    // Người đi bấm nút "Theo dõi"
  },
  followingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
    // Người được/bị theo dõi (Idol)
  }
}, {
  timestamps: true
});

//  Tránh việc 1 người bấm Follow 1 người 2 lần
followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

module.exports = mongoose.model('Follow', followSchema);