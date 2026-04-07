const User = require('../models/User');

// 1. API Xem danh sách Roles (Trả về danh sách cố định luôn)
exports.getAllRoles = (req, res) => {
  try {
    // Vì ta lưu dạng chữ trong User, nên BE chỉ cần báo cho FE biết hệ thống có các quyền này
    const roles = [
      { roleValue: 'user', description: 'Người dùng bình thường' },
      { roleValue: 'admin', description: 'Quản trị viên hệ thống' }
    ];
    
    res.status(200).json({ success: true, count: roles.length, data: roles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. API Cấp quyền cho User (Sửa lại để cập nhật trường 'role' dạng chữ)
exports.assignRoleToUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newRole = req.body.role; // FE sẽ gửi lên { "role": "admin" }

    // Kiểm tra xem quyền gửi lên có hợp lệ không
    const validRoles = ['user', 'admin'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ success: false, message: 'Quyền này không hợp lệ!' });
    }

    // Cập nhật thẳng vào trường 'role' của User
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { role: newRole }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng!' });
    }

    res.status(200).json({ 
      success: true, 
      message: `Đã cấp quyền [${newRole}] thành công!`,
      data: updatedUser 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};