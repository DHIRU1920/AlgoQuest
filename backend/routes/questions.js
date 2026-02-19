const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getDashboardStats,
} = require('../controllers/questionController');

const router = express.Router();

router.use(protect);

const questionValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('topic').isIn(['Arrays', 'Strings', 'Trees', 'Graphs', 'DP', 'DBMS', 'OS', 'CN']).withMessage('Invalid topic'),
  body('difficulty').isIn(['Easy', 'Medium', 'Hard']).withMessage('Invalid difficulty'),
  body('platform').isIn(['LeetCode', 'GFG', 'Codeforces', 'Other']).withMessage('Invalid platform'),
];

router.get('/', getQuestions);
router.get('/dashboard', getDashboardStats);
router.post('/', questionValidation, createQuestion);
router.put('/:id', questionValidation, updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
