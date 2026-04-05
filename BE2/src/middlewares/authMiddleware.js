const User = require('../models/User');

exports.isAdmin = async (req, res, next) => {
  try {
    // 1. Lấy ID người dùng 
    const currentUserId = req.headers['x-user-id'];

    if (!currentUserId) {
      return res.status(401).json({ success: false, message: 'Lỗi 401: Vui lòng cung cấp ID người dùng trong Header!' });
    }

    // 2. Tìm người dùng trong DB
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại!' });
    }

    // 3. KIỂM TRA QUYỀN (Khớp với trường role: "admin" )
    if (currentUser.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Lỗi 403: Bạn không có quyền Admin để làm việc này!' 
      });
    }

    // 4. Cho qua!
    next();
    
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server khi xác thực: ' + err.message });
  }
};