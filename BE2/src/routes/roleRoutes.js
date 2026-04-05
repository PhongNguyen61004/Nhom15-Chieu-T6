const express = require('express');
const router = express.Router();

// Import Controller
const { getAllRoles, assignRoleToUser } = require('../controllers/roleController');

// Import Middleware bảo vệ
const { isAdmin } = require('../middlewares/authMiddleware');

// Route này isAdmin mới được danh sách quyền 
router.get('/', isAdmin, getAllRoles);

// ĐẶT MIDDLEWARE VÀO ĐÂY: (Request) chạy qua đường dẫn -> Gặp isAdmin kiểm tra -> Pass tới assignRoleToUser
router.put('/assign/:userId', isAdmin, assignRoleToUser);

module.exports = router;