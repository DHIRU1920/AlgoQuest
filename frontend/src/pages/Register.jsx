import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const success = await register(formData.name, formData.email, formData.password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 text-brand" />
          </div>
          <h1 className="text-3xl font-bold text-brand mb-2">
            AlgoQuest
          </h1>
          <p className="text-muted">
            Start tracking your coding interview preparation
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-text mb-6">
            Create Account
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-sidebar border border-gray-600 rounded-xl text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-sidebar border border-gray-600 rounded-xl text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 bg-sidebar border border-gray-600 rounded-xl text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-brand transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 bg-sidebar border border-gray-600 rounded-xl text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-brand transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand text-gray-900 font-semibold py-3 px-4 rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-bg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-brand hover:opacity-80 font-medium transition-opacity">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
