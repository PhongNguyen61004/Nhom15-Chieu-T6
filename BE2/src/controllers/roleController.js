const Role = require('../models/Role');
const User = require('../models/User');

// 1. Lấy danh sách tất cả các Role (Dùng cho giao diện Admin)
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ success: true, count: roles.length, data: roles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Cấp lại quyền cho User (Tính năng cốt lõi)
// Khi Admin bấm nút lưu, FE sẽ gửi lên { "roleId": "60f123..." }
exports.assignRoleToUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newRoleId = req.body.roleId;

    // Kiểm tra xem cái quyền (role) mà Admin định cấp có tồn tại thật không
    const roleExists = await Role.findById(newRoleId);
    if (!roleExists) {
      return res.status(404).json({ success: false, message: 'Quyền này không tồn tại trong hệ thống!' });
    }

    // Cập nhật lại roleId cho User
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { roleId: newRoleId }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng!' });
    }

    res.status(200).json({ 
      success: true, 
      message: `Đã cấp quyền ${roleExists.roleName} thành công cho user!`,
      data: updatedUser 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};