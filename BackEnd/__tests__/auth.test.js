const request = require('supertest');
const app = require('../app');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

describe('Authentication Endpoints', () => {
  beforeEach(async () => {
    // Clear the users table before each test
    await User.destroy({ where: {} });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        displayName: 'Test User',
        preferredLanguage: 'en'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('username', userData.username);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should not register a user with existing email', async () => {
      // First create a user
      await User.create({
        username: 'existinguser',
        email: 'test@example.com',
        password: 'password123',
        displayName: 'Existing User',
        preferredLanguage: 'en'
      });

      // Try to create another user with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'test@example.com',
          password: 'password123',
          displayName: 'New User',
          preferredLanguage: 'en'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      const hashedPassword = await bcrypt.hash('password123', 10);
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
        displayName: 'Test User',
        preferredLanguage: 'en'
      });
    });

    it('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should not login with incorrect password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
}); 