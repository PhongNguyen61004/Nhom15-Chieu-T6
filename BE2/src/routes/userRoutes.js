const express = require('express');
const router = express.Router();

// 1. Import các hàm đã viết bên userController
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// 2. Gắn các hàm đó vào đúng đường dẫn (Endpoints)
// Đường dẫn: BASE_API/users
router.get('/', getAllUsers);

// Đường dẫn: BASE_API/users/:id 
router.get('/:id', getUserById);

// Đường dẫn: BASE_API/users (Dùng POST để thêm mới)
router.post('/', createUser);

// Đường dẫn: BASE_API/users/:id (Dùng PUT để sửa)
router.put('/:id', updateUser);

// Đường dẫn: BASE_API/users/:id (Dùng DELETE để xóa)
router.delete('/:id', deleteUser);

module.exports = router;