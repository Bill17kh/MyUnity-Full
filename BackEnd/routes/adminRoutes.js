// adminRoutes.js content placeholder

const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.send('Admin dashboard - placeholder');
});

router.get('/users', (req, res) => {
  res.send('List all users - placeholder');
});

module.exports = router;
