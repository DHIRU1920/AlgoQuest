# AlgoQuest 🚀

A modern MERN stack application for tracking coding interview preparation progress with a beautiful pastel-themed UI.

## 📸 Dashboard Preview

![AlgoQuest Dashboard](./dashboard-preview.png)

## ✨ Features

### 🎯 Core Functionality
- **User Authentication** - Secure login and registration with JWT
- **Question Tracking** - Add, edit, and categorize solved coding problems
- **Daily Coding Challenge** - Get a new coding problem every day
- **Progress Analytics** - Visualize your coding journey with charts
- **Topic Organization** - Track problems by algorithms and data structures

### 🎨 UI/UX Design
- **Custom Pastel Theme** - Beautiful dark base with soft pastel accents
- **Responsive Design** - Works perfectly on desktop and mobile
- **Modern Dashboard** - Clean, professional SaaS-style interface
- **Smooth Animations** - Polished transitions and hover effects
- **Accessibility** - High contrast and readable text throughout

### 📊 Dashboard Features
- **Stats Cards** - Track total questions, streak, topics covered
- **Weekly Progress** - Visual representation of daily activity
- **Topic Distribution** - Pie chart showing problem categories
- **Daily Challenge Widget** - Featured coding problem of the day

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Recharts** - Data visualization library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Elegant toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB instance (local or Atlas)
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DHIRU1920/AlgoQuest.git
   cd AlgoQuest
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In backend directory
   cp .env.example .env
   
   # Edit .env with your configuration
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/your_database
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Start backend (in backend directory)
   npm run dev

   # Start frontend (in frontend directory) 
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy automatically

3. **Required Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/your_database
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=production
   ```

### Manual Deployment

#### Frontend (Vite/React)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting provider
```

#### Backend (Node.js/Express)
```bash
cd backend
npm start
# Ensure your hosting provider supports Node.js and MongoDB
```

## 📁 Project Structure

```
AlgoQuest/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── questionController.js # Question CRUD operations
│   │   └── problemController.js # Daily challenge logic
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Question.js        # Question schema
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   ├── questionRoutes.js  # Question endpoints
│   │   └── problemRoutes.js   # Daily challenge endpoints
│   ├── server.js              # Express server setup
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx     # Main layout component
│   │   │   ├── DailyChallenge.jsx # Daily challenge widget
│   │   │   └── QuestionForm.jsx # Add/edit question modal
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Authentication context
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx  # Main dashboard
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Register.jsx   # Registration page
│   │   │   └── Questions.jsx  # Questions list page
│   │   ├── utils/
│   │   │   └── api.js         # Axios configuration
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # App entry point
│   │   └── index.css          # Global styles
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── vite.config.js         # Vite configuration
│   └── package.json
├── api/
│   └── index.js              # Vercel serverless function
├── vercel.json              # Vercel deployment config
├── .gitignore
├── .env.example
└── README.md
```

## 🎨 Theme & Design System

### Color Palette
- **Background**: `#020617` (Dark slate)
- **Card**: `#111827` (Slightly lighter slate)
- **Sidebar**: `#0f172a` (Medium slate)
- **Brand**: `#22c55e` (Green for CTAs)
- **Accent**: `#cbd5f5` (Light blue for highlights)
- **Text**: `#f8fafc` (Nearly white)
- **Muted**: `#94a3b8` (Secondary text)

### Design Principles
- **High Contrast**: All text meets WCAG accessibility standards
- **Rounded Corners**: Consistent `rounded-xl` throughout
- **Soft Shadows**: Subtle `shadow-lg` for depth
- **Smooth Transitions**: `duration-200` for all interactions
- **Consistent Spacing**: 16-24px padding standard

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Questions
- `GET /api/questions` - Get all user questions
- `POST /api/questions` - Create new question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Daily Challenge
- `GET /api/problems/random` - Get random coding problem
<img width="333" height="488" alt="image" src="https://github.com/user-attachments/assets/365b01ab-5d27-46a7-9ca0-acc76c97e802" />
