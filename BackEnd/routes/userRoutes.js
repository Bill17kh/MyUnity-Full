// userRoutes.js content placeholder

const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.send(`Get user with ID ${req.params.id} - placeholder`);
});

router.put('/:id', (req, res) => {
  res.send(`Update user with ID ${req.params.id} - placeholder`);
});

module.exports = router;
