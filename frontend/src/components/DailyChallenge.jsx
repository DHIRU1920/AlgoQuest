import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { 
  Calendar, 
  ExternalLink, 
  RefreshCw, 
  Code, 
  Clock,
  Tag,
  AlertCircle
} from 'lucide-react';

const DailyChallenge = () => {
  const [dailyProblem, setDailyProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDailyProblem();
  }, []);

  const fetchDailyProblem = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/problems/random');
      
      if (response.data.success) {
        setDailyProblem(response.data.data);
      } else {
        setError('Failed to load daily challenge');
      }
    } catch (err) {
      console.error('Error fetching daily problem:', err);
      setError('Unable to fetch daily challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  if (loading) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-100">Daily Coding Challenge</h2>
          <Calendar className="h-6 w-6 text-primary-500" />
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-100">Daily Coding Challenge</h2>
          <Calendar className="h-6 w-6 text-primary-500" />
        </div>
        <div className="flex flex-col items-center justify-center h-32 text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchDailyProblem}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Daily Coding Challenge</h2>
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-primary-500" />
          <button
            onClick={fetchDailyProblem}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Get new challenge"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {dailyProblem && (
        <div className="space-y-4">
          {/* Problem Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-100 mb-2 flex items-center space-x-2">
                <Code className="h-5 w-5 text-primary-500" />
                <span>{dailyProblem.title}</span>
              </h3>
              
              {/* Difficulty Badge */}
              <div className="flex items-center space-x-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(dailyProblem.difficulty)}`}>
                  {dailyProblem.difficulty || 'Easy'}
                </span>
                <div className="flex items-center space-x-1 text-gray-400 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Daily Challenge</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          {dailyProblem.tags && dailyProblem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {dailyProblem.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-1 px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-sm"
                >
                  <Tag className="h-3 w-3" />
                  <span>{tag}</span>
                </span>
              ))}
              {dailyProblem.tags.length > 5 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded-md text-sm">
                  +{dailyProblem.tags.length - 5} more
                </span>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-700">
            <a
              href={dailyProblem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Solve on LeetCode</span>
            </a>
          </div>

          {/* Challenge Info */}
          <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
            <p className="text-gray-300 text-sm">
              💡 <strong>Pro Tip:</strong> Try to solve this problem without looking at the solution first. 
              If you get stuck, take a break and come back with a fresh perspective!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
