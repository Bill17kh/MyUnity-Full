// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createPost, getPosts } = require('../controllers/postController');

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);

module.exports = router;
