const express = require('express');
const { createItem, getItems, updateItem, deleteItem, addComment } = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createItem);
router.get('/', getItems);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);
router.post('/:id/comment', addComment);

module.exports = router;
