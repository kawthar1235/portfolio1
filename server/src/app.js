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

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://portfolio1-navy-mu.vercel.app',
    'https://kawthar-dev.vercel.app',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/skills', skillRoutes);

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.use(errorMiddleware);

export default app;
