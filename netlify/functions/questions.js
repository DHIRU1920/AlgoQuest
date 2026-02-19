const { body, validationResult } = require('express-validator');
const { protect } = require('../../backend/middleware/auth');
const {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getDashboardStats,
} = require('../../backend/controllers/questionController');

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
    const { httpMethod, path, body, headers } = event;
    const pathParts = path.split('/').filter(Boolean);
    
    // Mock Express request/response
    const req = {
      body: body ? JSON.parse(body) : {},
      method: httpMethod,
      path: pathParts.join('/'),
      headers: headers || {},
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

    // Extract ID from path if present
    const idIndex = pathParts.indexOf('questions') + 1;
    if (idIndex < pathParts.length && pathParts[idIndex]) {
      req.params.id = pathParts[idIndex];
    }

    // Apply auth middleware
    await protect(req, res, async () => {
      // Route handling
      if (httpMethod === 'GET') {
        if (pathParts.includes('dashboard')) {
          await getDashboardStats(req, res);
        } else {
          await getQuestions(req, res);
        }
      } else if (httpMethod === 'POST') {
        // Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.statusCode = 400;
          res.body = JSON.stringify({ errors: errors.array() });
          return res;
        }
        await createQuestion(req, res);
      } else if (httpMethod === 'PUT') {
        // Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.statusCode = 400;
          res.body = JSON.stringify({ errors: errors.array() });
          return res;
        }
        await updateQuestion(req, res);
      } else if (httpMethod === 'DELETE') {
        await deleteQuestion(req, res);
      } else {
        res.statusCode = 404;
        res.body = JSON.stringify({ message: 'Questions route not found' });
      }
    });

    return res;
  } catch (error) {
    console.error('Questions function error:', error);
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
