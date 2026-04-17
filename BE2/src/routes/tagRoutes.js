const express = require('express');
const router = express.Router();
const { getAllTags, createTag, updateTag, deleteTag } = require('../controllers/tagController');

// Nếu có middleware bảo mật thì thêm vào giữa, ví dụ: router.post('/', isAdmin, createTag);
router.get('/', getAllTags);
router.post('/', createTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

module.exports = router;