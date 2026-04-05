const express = require('express');
const router = express.Router();

const {
  getAllComments,
  deleteComment
} = require('../controllers/commentController');

// Đường dẫn: GET /comments
router.get('/', getAllComments);

// Đường dẫn: DELETE /comments/:id (Nhớ truyền _id của MongoDB vào đây)
router.delete('/:id', deleteComment);

module.exports = router;