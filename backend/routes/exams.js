
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all exams for a chapter
router.get('/chapter/:chapterId', async (req, res) => {
  try {
    const { chapterId } = req.params;
    
    const [exams] = await db.query(
      'SELECT * FROM exams WHERE chapter_id = ?',
      [chapterId]
    );
    
    res.json({
      success: true,
      exams
    });
  } catch (error) {
    console.error('Get exams error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching exams'
    });
  }
});

// Get exam by ID with questions
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isStudent = !req.query.admin; // If admin=true, show correct answers
    
    const [exams] = await db.query('SELECT * FROM exams WHERE id = ?', [id]);
    
    if (exams.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }
    
    const exam = exams[0];
    
    // Get questions
    let questionsQuery = `
      SELECT id, chapter_id, question_text, option_a, option_b, option_c, option_d
      ${!isStudent ? ', correct_answer' : ''}
      FROM questions
      WHERE chapter_id = ?
      ORDER BY RAND()
      LIMIT ?
    `;
    
    const [questions] = await db.query(questionsQuery, [exam.chapter_id, exam.total_questions]);
    
    res.json({
      success: true,
      exam: {
        ...exam,
        questions
      }
    });
  } catch (error) {
    console.error('Get exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching exam'
    });
  }
});

// Create exam (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { course_id, chapter_id, title, time_limit, total_questions } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO exams (course_id, chapter_id, title, time_limit, total_questions) VALUES (?, ?, ?, ?, ?)',
      [course_id, chapter_id, title, time_limit, total_questions]
    );
    
    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      exam_id: result.insertId
    });
  } catch (error) {
    console.error('Create exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating exam'
    });
  }
});

// Update exam (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, time_limit, total_questions } = req.body;
    
    await db.query(
      'UPDATE exams SET title = ?, time_limit = ?, total_questions = ? WHERE id = ?',
      [title, time_limit, total_questions, id]
    );
    
    res.json({
      success: true,
      message: 'Exam updated successfully'
    });
  } catch (error) {
    console.error('Update exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating exam'
    });
  }
});

// Delete exam (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('DELETE FROM exams WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Exam deleted successfully'
    });
  } catch (error) {
    console.error('Delete exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting exam'
    });
  }
});

// Submit exam
router.post('/:id/submit', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { answers } = req.body; // Array of {question_id, answer}
    
    const [exams] = await db.query('SELECT * FROM exams WHERE id = ?', [id]);
    
    if (exams.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }
    
    // Check if user already attempted this exam
    const [attempts] = await db.query(
      'SELECT * FROM user_exam WHERE exam_id = ? AND user_id = ?',
      [id, user_id]
    );
    
    let user_exam_id;
    let attempt_count = 1;
    
    if (attempts.length > 0) {
      user_exam_id = attempts[0].id;
      attempt_count = attempts[0].attempt_count + 1;
      
      // Update attempt count
      await db.query(
        'UPDATE user_exam SET attempt_count = ? WHERE id = ?',
        [attempt_count, user_exam_id]
      );
    } else {
      // Create new user_exam record
      const [result] = await db.query(
        'INSERT INTO user_exam (exam_id, user_id, attempt_count) VALUES (?, ?, ?)',
        [id, user_id, attempt_count]
      );
      user_exam_id = result.insertId;
    }
    
    // Calculate score
    let correctCount = 0;
    
    for (const answer of answers) {
      // Get correct answer
      const [questions] = await db.query(
        'SELECT correct_answer FROM questions WHERE id = ?',
        [answer.question_id]
      );
      
      if (questions.length > 0 && questions[0].correct_answer === answer.answer) {
        correctCount++;
      }
      
      // Record the question in question_test
      await db.query(
        'INSERT INTO question_test (question_id, user_exam_id) VALUES (?, ?)',
        [answer.question_id, user_exam_id]
      );
    }
    
    const score = (correctCount / answers.length) * 100;
    
    // Update score
    await db.query(
      'UPDATE user_exam SET score = ? WHERE id = ?',
      [score, user_exam_id]
    );
    
    res.json({
      success: true,
      result: {
        score,
        correct_count: correctCount,
        total_questions: answers.length,
        attempt: attempt_count
      }
    });
  } catch (error) {
    console.error('Submit exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting exam'
    });
  }
});

// Get exam results for a user
router.get('/:id/results', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    
    const [results] = await db.query(
      'SELECT * FROM user_exam WHERE exam_id = ? AND user_id = ?',
      [id, user_id]
    );
    
    res.json({
      success: true,
      results: results.length > 0 ? results : null
    });
  } catch (error) {
    console.error('Get exam results error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching exam results'
    });
  }
});

module.exports = router;
