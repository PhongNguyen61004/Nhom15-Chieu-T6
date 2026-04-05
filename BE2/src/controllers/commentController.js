const Comment = require('../models/Comment');

// 1. Lấy tất cả bình luận (Dành cho Admin kiểm duyệt)
exports.getAllComments = async (req, res) => {
  try {
    // Admin thì nên xem được cả bình luận bình thường lẫn bình luận đã bị xóa mềm (để kiểm tra lại nếu cần)
    // Nếu muốn chỉ xem bình luận chưa xóa, bạn sửa thành: Comment.find({ isDeleted: false })
    const comments = await Comment.find();
    
    res.status(200).json({ 
      success: true, 
      count: comments.length, 
      data: comments 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Tính năng XÓA MỀM Bình luận (Dành cho Admin)
exports.deleteComment = async (req, res) => {
  try {
    // Tìm bình luận theo _id và cập nhật isDeleted thành true
    const deletedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true } // Trả về data mới sau khi cập nhật
    );

    if (!deletedComment) {
      return res.status(404).json({ success: false, message: 'Bình luận không tồn tại' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Đã ẩn bình luận vi phạm thành công!' 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};