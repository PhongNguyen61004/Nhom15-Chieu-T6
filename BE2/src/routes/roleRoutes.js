const express = require('express');
const router = express.Router();
const { getAllRoles, assignRoleToUser } = require('../controllers/roleController');
//const { isAdmin } = require('../middlewares/authMiddleware');


router.get('/', getAllRoles);
router.put('/assign/:userId', assignRoleToUser);

module.exports = router;