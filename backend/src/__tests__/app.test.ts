import request from 'supertest';
import express from 'express';
import pool from '../db';
import authRoutes from '../routes/auth';
import productRoutes from '../routes/products';
import blogRoutes from '../routes/blog';
import forumRoutes from '../routes/forum';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/forum', forumRoutes);

describe('GET /', () => {
  it('should return a successful database connection message', async () => {
    // Mock the pool.query to avoid actual database connection during tests
    jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [{ now: '2024-07-04T12:00:00.000Z' }] } as any);

    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Database connection successful!');
  });
});
