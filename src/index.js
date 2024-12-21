import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001; // Changed default port to 3001

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying port ${PORT + 1}`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', error);
  }
});

export default app;