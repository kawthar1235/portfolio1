import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

import errorMiddleware from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://portfolio1-navy-mu.vercel.app',
     ' https://kawthar-dev.vercel.app',
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/skills', skillRoutes);

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

// Error handler
app.use(errorMiddleware);

export default app;
