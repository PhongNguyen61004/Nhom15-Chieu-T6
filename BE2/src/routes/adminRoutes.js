const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/authMiddleware');
const { getDashboardStats, banUser, unbanUser } = require('../controllers/adminController');

router.put('/users/:id/ban', banUser);
router.put('/users/:id/unban', unbanUser);
router.get('/stats', isAdmin, getDashboardStats);

module.exports = router;