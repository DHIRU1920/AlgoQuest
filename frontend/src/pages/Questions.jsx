import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import QuestionForm from '../components/QuestionForm';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Calendar,
  BookOpen,
  BarChart3,
} from 'lucide-react';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const topics = ['all', 'Arrays', 'Strings', 'Trees', 'Graphs', 'DP', 'DBMS', 'OS', 'CN'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [questions, searchTerm, filterTopic, filterDifficulty]);

  const fetchQuestions = async () => {
    try {
      const response = await api.get('/questions');
      if (response.data.success) {
        setQuestions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterQuestions = () => {
    let filtered = questions;

    if (searchTerm) {
      filtered = filtered.filter((q) =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterTopic !== 'all') {
      filtered = filtered.filter((q) => q.topic === filterTopic);
    }

    if (filterDifficulty !== 'all') {
      filtered = filtered.filter((q) => q.difficulty === filterDifficulty);
    }

    setFilteredQuestions(filtered);
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setShowForm(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await api.delete(`/questions/${id}`);
        setQuestions(questions.filter((q) => q._id !== id));
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingQuestion) {
        const response = await api.put(`/questions/${editingQuestion._id}`, formData);
        if (response.data.success) {
          setQuestions(
            questions.map((q) =>
              q._id === editingQuestion._id ? response.data.data : q
            )
          );
        }
      } else {
        const response = await api.post('/questions', formData);
        if (response.data.success) {
          setQuestions([response.data.data, ...questions]);
        }
      }
      setShowForm(false);
      setEditingQuestion(null);
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-900/20 border-green-800';
      case 'Medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'Hard': return 'text-red-400 bg-red-900/20 border-red-800';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-100">Questions</h1>
        <button
          onClick={handleAddQuestion}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Question</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="input"
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic === 'all' ? 'All Topics' : topic}
              </option>
            ))}
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="input"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty}
              </option>
            ))}
          </select>

          <div className="text-gray-400 flex items-center justify-center">
            <span>{filteredQuestions.length} questions</span>
          </div>
        </div>
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="card p-12 text-center">
          <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-100 mb-2">
            {questions.length === 0 ? 'No questions yet' : 'No questions found'}
          </h3>
          <p className="text-gray-400 mb-6">
            {questions.length === 0
              ? 'Start adding questions to track your progress'
              : 'Try adjusting your filters or search terms'}
          </p>
          {questions.length === 0 && (
            <button
              onClick={handleAddQuestion}
              className="btn btn-primary"
            >
              Add Your First Question
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredQuestions.map((question) => (
            <div key={question._id} className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    {question.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-900/20 text-primary-400 border border-primary-800 rounded">
                      {question.topic}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium border rounded ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600 rounded">
                      {question.platform}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditQuestion(question)}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question._id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {question.notes && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {question.notes}
                </p>
              )}

              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Solved on {new Date(question.solvedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Question Form Modal */}
      {showForm && (
        <QuestionForm
          question={editingQuestion}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingQuestion(null);
          }}
        />
      )}
    </div>
  );
};

export default Questions;
