const Post = require('../models/Post');

// 1. Lấy danh sách bài viết (Chỉ lấy bài isDeleted: false)
exports.getAllPosts = async (req, res) => {
  try {
    // Luôn luôn lọc bỏ những bài đã bị "xóa mềm"
    const posts = await Post.find({ isDeleted: false });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Lấy 1 bài viết theo _id (ObjectId của MongoDB)
exports.getPostById = async (req, res) => {
  try {
    // Dùng findById vì lúc này param truyền vào là chuỗi ObjectId dài loằng ngoằng
    const post = await Post.findById(req.params.id);
    
    // Nếu không tìm thấy hoặc bài đó đã bị xóa mềm
    if (!post || post.isDeleted) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 3. Tạo bài viết mới (không cần tính nextId)
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json({ success: true, data: savedPost });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 4. Cập nhật bài viết
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPost) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
    res.status(200).json({ success: true, data: updatedPost });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 5. Tính năng XÓA MỀM (Soft Delete) 
exports.deletePost = async (req, res) => {
  try {
    // Thay vì xóa bay màu (findOneAndDelete), chỉ cập nhật isDeleted thành true
    const deletedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedPost) return res.status(404).json({ success: false, message: 'Bài viết không tồn tại' });
    res.status(200).json({ success: true, message: 'Đã đưa bài viết vào thùng rác (Xóa mềm)!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};