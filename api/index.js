const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://algoquest.vercel.app', 'https://algoquest-dhiru1920.vercel.app']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint (no database needed)
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Basic test endpoints (without database for now)
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working' });
});

// Import and use routes (with database connection)
const authRoutes = require('../backend/routes/auth');
const questionRoutes = require('../backend/routes/questions');
const problemRoutes = require('../backend/routes/problemRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/problems', problemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Export for Vercel
module.exports = app;
