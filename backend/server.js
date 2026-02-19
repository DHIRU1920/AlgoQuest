require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/database');

const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const problemRoutes = require('./routes/problemRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/problems', problemRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
