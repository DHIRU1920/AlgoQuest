const { validationResult } = require('express-validator');
const Question = require('../models/Question');

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ message: 'Server error while fetching questions' });
  }
};

const createQuestion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, topic, difficulty, platform, notes, solvedDate } = req.body;

    const question = await Question.create({
      userId: req.user.id,
      title,
      topic,
      difficulty,
      platform,
      notes,
      solvedDate: solvedDate || new Date(),
    });

    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error('Create question error:', error);
    res.status(500).json({ message: 'Server error while creating question' });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, topic, difficulty, platform, notes, solvedDate } = req.body;

    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this question' });
    }

    question = await Question.findByIdAndUpdate(
      req.params.id,
      { title, topic, difficulty, platform, notes, solvedDate },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error('Update question error:', error);
    res.status(500).json({ message: 'Server error while updating question' });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this question' });
    }

    await question.deleteOne();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error('Delete question error:', error);
    res.status(500).json({ message: 'Server error while deleting question' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const totalQuestions = await Question.countDocuments({ userId });
    
    const questionsByTopic = await Question.aggregate([
      { $match: { userId } },
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const questionsByDifficulty = await Question.aggregate([
      { $match: { userId } },
      { $group: { _id: '$difficulty', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const recentQuestions = await Question.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    const questionsByDate = await Question.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$solvedDate' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    const streak = await calculateStreak(userId);

    res.json({
      success: true,
      data: {
        totalQuestions,
        questionsByTopic,
        questionsByDifficulty,
        recentQuestions,
        questionsByDate,
        streak,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error while fetching dashboard stats' });
  }
};

const calculateStreak = async (userId) => {
  const questions = await Question.find({ userId })
    .sort({ solvedDate: -1 })
    .select('solvedDate');
  
  if (questions.length === 0) return 0;
  
  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastQuestionDate = new Date(questions[0].solvedDate);
  lastQuestionDate.setHours(0, 0, 0, 0);
  
  if (lastQuestionDate.getTime() !== today.getTime()) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastQuestionDate.getTime() !== yesterday.getTime()) {
      return 0;
    }
  }
  
  for (let i = 1; i < questions.length; i++) {
    const currentDate = new Date(questions[i - 1].solvedDate);
    currentDate.setHours(0, 0, 0, 0);
    
    const prevDate = new Date(questions[i].solvedDate);
    prevDate.setHours(0, 0, 0, 0);
    
    const diffTime = currentDate - prevDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

module.exports = {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getDashboardStats,
};
