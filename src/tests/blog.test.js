import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import User from '../models/User.js';
import Blog from '../models/Blog.js';

describe('Blog API', () => {
  let token;
  let userId;
  let blogId;

  beforeAll(async () => {
    const userResponse = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123'
      });

    token = userResponse.body.token;
    userId = userResponse.body._id;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
  });

  it('should create a new blog', async () => {
    const response = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog',
        description: 'Test Description',
        body: 'Test Body',
        tags: ['test']
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Blog');
    blogId = response.body._id;
  });

  it('should get published blogs', async () => {
    const response = await request(app)
      .get('/api/blogs');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.blogs)).toBe(true);
  });

  it('should update blog state to published', async () => {
    const response = await request(app)
      .put(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        state: 'published'
      });

    expect(response.status).toBe(200);
    expect(response.body.state).toBe('published');
  });

  it('should increment read count when getting blog by id', async () => {
    const response = await request(app)
      .get(`/api/blogs/${blogId}`);

    expect(response.status).toBe(200);
    expect(response.body.readCount).toBe(1);
  });
});