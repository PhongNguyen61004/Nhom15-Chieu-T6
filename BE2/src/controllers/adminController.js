const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Tag=require('../models/Tag');
const Reaction=require('../models/Reaction');
const Follow = require('../models/Follow');


exports.getDashboardStats = async (req, res) => {
  try {
    // Đếm số lượng từ các bảng đã có Model
    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();
    const commentCount = await Comment.countDocuments();
    const tagCount = await Tag.countDocuments();
    const reactionCount = await Reaction.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const followCount = await Follow.countDocuments();
  

    res.status(200).json({
      success: true,
      data: {
        totalUsers: userCount,
        totalAdmins: adminCount,
        totalPosts: postCount,
        totalComments: commentCount,
        totalReactions: reactionCount,
        totalTags: tagCount,
        totalFollows: followCount            
        
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//Hàm Khóa tài khoản (Ban User)
exports.banUser = async (req, res) => {
  try {
    // Tìm user và đổi isBanned thành true
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { isBanned: true }, 
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }

    res.status(200).json({ 
      success: true, 
      message: `Đã KHÓA tài khoản của người dùng: ${user.username}!` 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//  Hàm Mở khóa tài khoản (Unban User)
exports.unbanUser = async (req, res) => {
  try {
    // Tìm user và đổi isBanned lại thành false
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { isBanned: false }, 
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }

    res.status(200).json({ 
      success: true, 
      message: `Đã MỞ KHÓA cho tài khoản: ${user.username}!` 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};