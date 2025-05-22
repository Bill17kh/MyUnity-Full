// controllers/communityController.js
const { Community } = require('../models');

async function createCommunity(req, res) {
  try {
    const { name, description } = req.body;

    const existing = await Community.findOne({ where: { name } });
    if (existing) return res.status(400).json({ message: 'Community already exists' });

    const community = await Community.create({ name, description });
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create community', error });
  }
}

async function getCommunities(req, res) {
  try {
    const communities = await Community.findAll({ order: [['createdAt', 'DESC']] });
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch communities', error });
  }
}

module.exports = {
  createCommunity,
  getCommunities,
};
