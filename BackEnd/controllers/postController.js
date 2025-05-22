// controllers/postController.js
const { Post, User } = require('../models');

async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error });
  }
}

async function getPosts(req, res) {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: 'author', attributes: ['id', 'username', 'email'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
}

module.exports = {
  createPost,
  getPosts,
};
