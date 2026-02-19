require('dotenv').config();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { register, login } = require('../../backend/controllers/authController');

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

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
    
    const { httpMethod, path, body } = event;
    const pathParts = path.split('/').filter(Boolean);
    
    // Mock Express request/response
    const req = {
      body: body ? JSON.parse(body) : {},
      method: httpMethod,
      path: pathParts.join('/')
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
    if (pathParts.includes('register') && httpMethod === 'POST') {
      // Apply validation
      await Promise.all(registerValidation.map(validation => validation.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.statusCode = 400;
        res.body = JSON.stringify({ errors: errors.array() });
        return res;
      }
      await register(req, res);
    } else if (pathParts.includes('login') && httpMethod === 'POST') {
      // Apply validation
      await Promise.all(loginValidation.map(validation => validation.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.statusCode = 400;
        res.body = JSON.stringify({ errors: errors.array() });
        return res;
      }
      await login(req, res);
    } else {
      res.statusCode = 404;
      res.body = JSON.stringify({ message: 'Auth route not found' });
    }

    return res;
  } catch (error) {
    console.error('Auth function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Internal server error', error: error.message })
    };
  }
};
