// routes/communityRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createCommunity, getCommunities } = require('../controllers/communityController');

router.post('/', authMiddleware, createCommunity);
router.get('/', getCommunities);

module.exports = router;
