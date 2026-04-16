const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
//const { isAdmin } = require('../middlewares/authMiddleware');

router.get('/stats', getDashboardStats);

module.exports = router;