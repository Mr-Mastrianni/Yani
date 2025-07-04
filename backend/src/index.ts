
import express, { Request, Response, NextFunction } from 'express';
import pool from './db';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import blogRoutes from './routes/blog';
import forumRoutes from './routes/forum';
import logger from './config/logger';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON request bodies

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connection successful! Current time: ${result.rows[0].now}`);
  } catch (err) {
    logger.error('Database connection error:', err);
    res.status(500).send('Database connection error');
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/forum', forumRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
