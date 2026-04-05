const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getDashboardStats = async (req, res) => {
  try {
    // Dùng Promise.all để hệ thống chạy 6 truy vấn cùng một lúc thay vì chờ từng cái
    const [
      totalUsers,
      totalPosts,
      totalComments,
      totalLikes,
      totalShares,
      totalFollows
    ] = await Promise.all([
      User.countDocuments(), // Đếm tất cả tài khoản
      Post.countDocuments({ isDeleted: false }), // Chỉ đếm bài viết đang hiển thị
      Comment.countDocuments({ isDeleted: false }), // Chỉ đếm bình luận hợp lệ
      
      // Đếm trực tiếp từ Database mà không cần file Model
      mongoose.connection.collection('likes').countDocuments(),
      mongoose.connection.collection('shares').countDocuments(),
      mongoose.connection.collection('follows').countDocuments()
    ]);

    // Trả về một cục dữ liệu 
    res.status(200).json({
      success: true,
      message: "Lấy dữ liệu thống kê thành công",
      data: {
        users: totalUsers,
        posts: totalPosts,
        comments: totalComments,
        likes: totalLikes,
        shares: totalShares,
        follows: totalFollows
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi khi lấy dữ liệu thống kê: ' + err.message });
  }
};