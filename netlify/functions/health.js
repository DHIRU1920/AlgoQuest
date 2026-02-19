require('dotenv').config();

exports.handler = async (event, context) => {
  try {
    // Check environment variables
    const envVars = {
      MONGO_URI: process.env.MONGO_URI ? 'Set' : 'Not set',
      JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
      NODE_ENV: process.env.NODE_ENV || 'Not set'
    };

    // Test database connection
    const mongoose = require('mongoose');
    let dbStatus = 'Not connected';
    
    try {
      if (process.env.MONGO_URI) {
        await mongoose.connect(process.env.MONGO_URI);
        dbStatus = 'Connected';
        await mongoose.disconnect();
      }
    } catch (error) {
      dbStatus = `Connection failed: ${error.message}`;
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Health check completed',
        environment: envVars,
        database: dbStatus,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        message: 'Health check failed',
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
