require('dotenv').config();
const mongoose = require('mongoose');
const { getRandomEasyProblem } = require('../../backend/controllers/problemController');

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

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: ''
    };
  }

  try {
    await connectDB();
    
    const { httpMethod, path } = event;
    const pathParts = path.split('/').filter(Boolean);
    
    // Mock Express request/response
    const req = {
      body: {},
      method: httpMethod,
      path: pathParts.join('/'),
      headers: {},
      params: {},
      query: {}
    };
    
    const res = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      json: (data) => {
        res.body = JSON.stringify(data);
        return res;
      },
      status: (code) => {
        res.statusCode = code;
        return res;
      }
    };

    // Route handling
    if (httpMethod === 'GET' && pathParts.includes('random')) {
      await getRandomEasyProblem(req, res);
    } else {
      res.statusCode = 404;
      res.body = JSON.stringify({ message: 'Problems route not found' });
    }

    return res;
  } catch (error) {
    console.error('Problems function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};
