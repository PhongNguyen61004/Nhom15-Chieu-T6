const Tag = require('../models/Tag');

// Lấy danh sách tất cả các Tag
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({ success: true, count: tags.length, data: tags });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Tạo Tag mới
exports.createTag = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const newTag = new Tag({ name, slug, description });
    const savedTag = await newTag.save();
    
    res.status(201).json({ success: true, data: savedTag });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Admin Sửa Tag
exports.updateTag = async (req, res) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedTag) return res.status(404).json({ success: false, message: 'Không tìm thấy Tag' });
    
    res.status(200).json({ success: true, data: updatedTag });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Admin Xóa Tag
exports.deleteTag = async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) return res.status(404).json({ success: false, message: 'Không tìm thấy Tag' });
    
    res.status(200).json({ success: true, message: 'Đã xóa Tag thành công!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};