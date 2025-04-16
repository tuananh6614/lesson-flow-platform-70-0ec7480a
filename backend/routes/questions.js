
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all questions for a chapter (admin only)
router.get('/chapter/:chapterId', verifyToken, isAdmin, async (req, res) => {
  try {
    const { chapterId } = req.params;
    
    const [questions] = await db.query(
      'SELECT * FROM questions WHERE chapter_id = ?',
      [chapterId]
    );
    
    res.json({
      success: true,
      questions
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching questions'
    });
  }
});

// Get question by ID (admin only)
router.get('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [questions] = await db.query('SELECT * FROM questions WHERE id = ?', [id]);
    
    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    res.json({
      success: true,
      question: questions[0]
    });
  } catch (error) {
    console.error('Get question error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching question'
    });
  }
});

// Create question (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const {
      chapter_id,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer
    } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO questions 
      (chapter_id, question_text, option_a, option_b, option_c, option_d, correct_answer) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [chapter_id, question_text, option_a, option_b, option_c, option_d, correct_answer]
    );
    
    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      question_id: result.insertId
    });
  } catch (error) {
    console.error('Create question error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating question'
    });
  }
});

// Update question (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer
    } = req.body;
    
    await db.query(
      `UPDATE questions 
      SET question_text = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_answer = ? 
      WHERE id = ?`,
      [question_text, option_a, option_b, option_c, option_d, correct_answer, id]
    );
    
    res.json({
      success: true,
      message: 'Question updated successfully'
    });
  } catch (error) {
    console.error('Update question error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating question'
    });
  }
});

// Delete question (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('DELETE FROM questions WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error('Delete question error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting question'
    });
  }
});

// Bulk create questions (admin only)
router.post('/bulk', verifyToken, isAdmin, async (req, res) => {
  try {
    const { questions } = req.body; // Array of question objects
    
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid questions data'
      });
    }
    
    // Use transaction to ensure all questions are created
    await db.query('START TRANSACTION');
    
    for (const question of questions) {
      await db.query(
        `INSERT INTO questions 
        (chapter_id, question_text, option_a, option_b, option_c, option_d, correct_answer) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          question.chapter_id,
          question.question_text,
          question.option_a,
          question.option_b,
          question.option_c,
          question.option_d,
          question.correct_answer
        ]
      );
    }
    
    await db.query('COMMIT');
    
    res.status(201).json({
      success: true,
      message: `${questions.length} questions created successfully`
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Bulk create questions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating questions'
    });
  }
});

module.exports = router;
