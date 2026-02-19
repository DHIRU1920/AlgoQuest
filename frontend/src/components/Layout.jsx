import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BarChart3,
  BookOpen,
  LogOut,
  Menu,
  X,
  Brain,
  User,
} from 'lucide-react';
import { useState } from 'react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Questions', href: '/questions', icon: BookOpen },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-bg opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out shadow-xl
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-brand" />
            <span className="text-xl font-bold text-brand">AlgoQuest</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted hover:text-text transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive(item.href)
                      ? 'bg-brand text-gray-900 shadow-lg'
                      : 'text-muted hover:bg-card hover:text-text'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <User className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">
                {user?.name}
              </p>
              <p className="text-sm text-muted truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-muted hover:bg-card hover:text-text rounded-xl transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top navigation bar */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16 px-4 bg-sidebar border-b border-gray-700">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-muted hover:text-text transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-brand" />
              <span className="text-lg font-bold text-brand">AlgoQuest</span>
            </div>
            <div className="w-6"></div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
