import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

const QuestionForm = ({ question, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    topic: 'Arrays',
    difficulty: 'Easy',
    platform: 'LeetCode',
    notes: '',
    solvedDate: new Date().toISOString().split('T')[0],
  });

  const topics = ['Arrays', 'Strings', 'Trees', 'Graphs', 'DP', 'DBMS', 'OS', 'CN'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const platforms = ['LeetCode', 'GFG', 'Codeforces', 'Other'];

  useEffect(() => {
    if (question) {
      setFormData({
        title: question.title,
        topic: question.topic,
        difficulty: question.difficulty,
        platform: question.platform,
        notes: question.notes || '',
        solvedDate: new Date(question.solvedDate).toISOString().split('T')[0],
      });
    }
  }, [question]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text">
            {question ? 'Edit Question' : 'Add Question'}
          </h2>
          <button
            onClick={onCancel}
            className="text-muted hover:text-text transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text mb-2">
              Question Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-sidebar border border-gray-600 rounded-xl text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
              placeholder="e.g., Two Sum"
              required
            />
          </div>

          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-text mb-2">
              Topic *
            </label>
            <select
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-sidebar border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
              required
            >
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-text mb-2">
              Difficulty *
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-sidebar border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
              required
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-text mb-2">
              Platform *
            </label>
            <select
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-sidebar border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
              required
            >
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="solvedDate" className="block text-sm font-medium text-text mb-2">
              Solved Date *
            </label>
            <input
              type="date"
              id="solvedDate"
              name="solvedDate"
              value={formData.solvedDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-sidebar border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-text mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-sidebar border border-gray-600 rounded-xl text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 resize-none"
              rows="4"
              placeholder="Add your thoughts, approach, or key insights..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-brand text-brand rounded-xl hover:bg-brand hover:text-gray-900 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-brand text-gray-900 rounded-xl hover:opacity-90 transition-all duration-200"
            >
              {question ? 'Update' : 'Add'} Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
