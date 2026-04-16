const express = require('express');
const router = express.Router();
const { getAllComments, deleteComment } = require('../controllers/commentController');


router.get('/', getAllComments);
router.delete('/:id', deleteComment);

module.exports = router;