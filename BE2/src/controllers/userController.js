const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// 1. Lấy tất cả User (GET /users)
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
    
    const user = await User.findById(req.params.id); 
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    res.status(200).json({ success: true, data: user }); 
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. CREATE
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, name, bio, avatar, location } = req.body;

    // Kiểm tra xem đã nhập password chưa
    if (!password) {
      return res.status(400).json({ success: false, message: "Vui lòng cung cấp mật khẩu" });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới với passwordHash và các trường mở rộng
    const newUser = new User({

      username,
      email,
      passwordHash: hashedPassword,
      name,
      bio,
      avatar,
      location
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
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true, runValidators: true }

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

    const deletedUser = await User.findByIdAndDelete(req.params.id);



    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User không tồn tại" });
    }

    res.status(200).json({ success: true, message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    // 1. Tìm User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email không tồn tại' });
    }
    if (user.isBanned) {
      return res.status(403).json({ 
        message: 'Tài khoản của bạn đã bị Admin khóa do vi phạm!' 
      });
    }

    // 2. Kiểm tra mật khẩu bằng bcrypt với trường passwordHash
    const isMatch = await bcrypt.compare(password, user.passwordHash); 
    if (!isMatch) {
        return res.status(401).json({ message: 'Sai mật khẩu' });
    }
   
    // 3. Chế tạo Token có hạn 1 ngày
    const token = jwt.sign(
        { id: user._id, role: user.role }, // Gói ID và Role vào token
        process.env.JWT_SECRET || 'mat_khau_bi_mat_nhom_15', 
        { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
