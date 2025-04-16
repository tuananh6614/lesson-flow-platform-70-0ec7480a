
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const chaptersRoutes = require('./routes/chapters');
const lessonsRoutes = require('./routes/lessons');
const enrollmentRoutes = require('./routes/enrollment');
const examsRoutes = require('./routes/exams');
const questionsRoutes = require('./routes/questions');
const certificatesRoutes = require('./routes/certificates');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/chapters', chaptersRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/exams', examsRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/certificates', certificatesRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Learning Management System API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
