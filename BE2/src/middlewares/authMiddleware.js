const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAdmin = async (req, res, next) => {
  try {
    // 1. Tìm thẻ Token trong Header của request
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Lỗi 401: Bạn chưa đăng nhập!' });
    }

    // 2. Giải mã Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mat_khau_bi_mat_nhom_15');

    // 3. Tìm user trong DB để kiểm tra quyền hiện tại
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ success: false, message: 'Tài khoản này không tồn tại!' });
    }

    // 4. CHỐT CHẶN PHÂN QUYỀN: Kiểm tra xem có phải Admin không
    if (currentUser.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Lỗi 403: Truy cập bị từ chối. Khu vực này chỉ dành cho Admin!' 
      });
    }

    // 5. Hợp lệ thì cho đi tiếp vào hàm xử lý (Controller)
    req.user = currentUser;
    next();

  } catch (err) {
    res.status(401).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};