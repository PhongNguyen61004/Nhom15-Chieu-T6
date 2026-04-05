const express = require('express');
const router = express.Router();

const { getDashboardStats } = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/authMiddleware');

// Đường dẫn: GET /admin/stats
// Phải có isAdmin để chặn các User 
router.get('/stats', isAdmin, getDashboardStats);

module.exports = router;