const User = require('../models/User');

// 1. GET ALL
exports.getAllUsers = async (req, res) => {
  try {
    const { name } = req.query;
    let query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
    }
    const users = await User.find(query);
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// 2. Lấy 1 User theo ID số (GET /users/:id)
exports.getUserById = async (req, res) => {
  try {
    
    const user = await User.findOne({ id: req.params.id }); 
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    res.status(200).json({ success: true, data: user }); 
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. CREATE
exports.createUser = async (req, res) => {
  try {
    const { username, email } = req.body; // ✅ Đã bỏ id
    const newUser = new User({
      id,
      username,
      email
    });
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, data: savedUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 3. UPDATE
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: req.params.id },
      req.body, 
      { new: true, runValidators: true } // Trả về bản ghi mới sau khi sửa và kiểm tra dữ liệu
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 4. DELETE
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ id: req.params.id });

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User không tồn tại" });
    }

    res.status(200).json({ success: true, message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};