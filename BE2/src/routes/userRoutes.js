const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Đường dẫn: BASE_API/users -> Lấy tất cả
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Đường dẫn: BASE_API/users/:id -> Lấy theo id số (ví dụ: /users/1)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: Number(req.params.id) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;