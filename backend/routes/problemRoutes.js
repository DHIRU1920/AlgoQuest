const express = require('express');
const { getRandomEasyProblem } = require('../controllers/problemController');

const router = express.Router();

// GET /api/problems/random - Get a random easy coding problem
router.get('/random', getRandomEasyProblem);

module.exports = router;
