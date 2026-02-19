const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    required: [true, 'Please provide a question title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  topic: {
    type: String,
    required: [true, 'Please provide a topic'],
    enum: {
      values: ['Arrays', 'Strings', 'Trees', 'Graphs', 'DP', 'DBMS', 'OS', 'CN'],
      message: 'Please select a valid topic'
    }
  },
  difficulty: {
    type: String,
    required: [true, 'Please provide a difficulty level'],
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty must be Easy, Medium, or Hard'
    }
  },
  platform: {
    type: String,
    required: [true, 'Please provide a platform'],
    enum: {
      values: ['LeetCode', 'GFG', 'Codeforces', 'Other'],
      message: 'Platform must be LeetCode, GFG, Codeforces, or Other'
    }
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  },
  solvedDate: {
    type: Date,
    required: [true, 'Please provide the solved date'],
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
