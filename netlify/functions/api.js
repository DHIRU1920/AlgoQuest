require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ MongoDB Connected");
    }
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

// Import route handlers
const authHandler = require('./auth');
const questionsHandler = require('./questions');
const problemsHandler = require('./problems');

exports.handler = async (event, context) => {
  try {
    await connectDB();
    
    const { httpMethod, path, body, headers } = event;
    const pathParts = path.split('/').filter(Boolean);
    
    // Route to appropriate handler
    if (pathParts[0] === 'api') {
      if (pathParts[1] === 'auth') {
        return await authHandler.handler(event, context);
      } else if (pathParts[1] === 'questions') {
        return await questionsHandler.handler(event, context);
      } else if (pathParts[1] === 'problems') {
        return await problemsHandler.handler(event, context);
      } else if (pathParts[1] === 'health') {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
          },
          body: JSON.stringify({ success: true, message: 'Server is running' })
        };
      }
    }
    
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Route not found' })
    };
    
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Something went wrong!' })
    };
  }
};
