// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { askAI } = require('../controllers/aiAssistantController');

router.post('/ask', authMiddleware, askAI);

module.exports = router;
