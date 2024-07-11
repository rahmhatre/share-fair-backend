import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';

import { authenticateToken } from './middleware/auth';

// Routes
import register from './routes/register';
import users from './routes/users';
import group from './routes/group';
import member from './routes/member';

// ENV Variables
const { DATABASE_URL, PORT } = process.env;

// Connect to MongoDB
mongoose
  .connect(DATABASE_URL as string)
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((error) => {
    console.log('Database connection failed. Exiting now...');
    console.error(error);
    process.exit(1);
  });

// Create Express server
const app = express(); // New express instance
const port = PORT ?? 3000; // Port number

// Express configuration
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan('dev')); // Enable Morgan

// API base URL for all endpoints
app.use('/api', register);
app.use('/api', authenticateToken, users);
app.use('/api', authenticateToken, group);
app.use('/api', authenticateToken, member);

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

// Export Express app
export default app;
