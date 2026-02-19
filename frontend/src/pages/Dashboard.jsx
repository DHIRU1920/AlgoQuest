import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import DailyChallenge from '../components/DailyChallenge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  Brain,
  Target,
  TrendingUp,
  Calendar,
  BookOpen,
  CheckCircle,
  Clock,
  Award,
} from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/questions/dashboard');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Unable to load dashboard data</p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text">Dashboard</h1>
        <div className="flex items-center space-x-2 text-brand">
          <Brain className="h-6 w-6" />
          <span className="font-bold">AlgoQuest</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl shadow-lg p-6 border border-gray-700 transition-all duration-200 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Total Questions</p>
              <p className="text-3xl font-bold text-text mt-1">{stats.totalQuestions}</p>
            </div>
            <Target className="h-8 w-8 text-brand" />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 border border-gray-700 transition-all duration-200 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Daily Streak</p>
              <p className="text-3xl font-bold text-text mt-1">{stats.streak}</p>
            </div>
            <Award className="h-8 w-8 text-accent" />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 border border-gray-700 transition-all duration-200 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Topics Covered</p>
              <p className="text-3xl font-bold text-text mt-1">{stats.questionsByTopic.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-brand" />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 border border-gray-700 transition-all duration-200 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">This Week</p>
              <p className="text-3xl font-bold text-text mt-1">
                {stats.questionsByDate.slice(-7).reduce((acc, day) => acc + day.count, 0)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-brand" />
          </div>
        </div>
      </div>

      {/* Daily Coding Challenge */}
      <DailyChallenge />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Questions by Topic */}
        <div className="bg-card rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-text mb-4">Questions by Topic</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.questionsByTopic}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="_id" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Questions by Difficulty */}
        <div className="bg-card rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-text mb-4">Questions by Difficulty</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.questionsByDifficulty}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ _id, count }) => `${_id}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {stats.questionsByDifficulty.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getDifficultyColor(entry._id)} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f3f4f6' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress Over Time */}
      <div className="bg-card rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-text mb-4">Progress Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.questionsByDate}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="_id" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-text mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {stats.recentQuestions.length === 0 ? (
            <p className="text-muted text-center py-8">No questions solved yet. Start your journey!</p>
          ) : (
            stats.recentQuestions.map((question) => (
              <div key={question._id} className="flex items-center justify-between p-3 bg-sidebar rounded-xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand" />
                  <div>
                    <p className="text-text font-medium">{question.title}</p>
                    <p className="text-muted text-sm">
                      {question.topic} • {question.difficulty} • {question.platform}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-muted">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(question.solvedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
