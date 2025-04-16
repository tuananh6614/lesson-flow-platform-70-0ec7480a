
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all chapters for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const [chapters] = await db.query(
      'SELECT * FROM chapters WHERE course_id = ? ORDER BY chapter_order',
      [courseId]
    );
    
    res.json({
      success: true,
      chapters
    });
  } catch (error) {
    console.error('Get chapters error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chapters'
    });
  }
});

// Get chapter by ID with lessons
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [chapters] = await db.query('SELECT * FROM chapters WHERE id = ?', [id]);
    
    if (chapters.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
    }
    
    const chapter = chapters[0];
    
    // Get lessons
    const [lessons] = await db.query(
      'SELECT * FROM lessons WHERE chapter_id = ? ORDER BY lesson_order',
      [id]
    );
    
    res.json({
      success: true,
      chapter: {
        ...chapter,
        lessons
      }
    });
  } catch (error) {
    console.error('Get chapter error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chapter'
    });
  }
});

// Create chapter (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { course_id, title, chapter_order } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO chapters (course_id, title, chapter_order) VALUES (?, ?, ?)',
      [course_id, title, chapter_order]
    );
    
    res.status(201).json({
      success: true,
      message: 'Chapter created successfully',
      chapter_id: result.insertId
    });
  } catch (error) {
    console.error('Create chapter error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating chapter'
    });
  }
});

// Update chapter (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, chapter_order } = req.body;
    
    await db.query(
      'UPDATE chapters SET title = ?, chapter_order = ? WHERE id = ?',
      [title, chapter_order, id]
    );
    
    res.json({
      success: true,
      message: 'Chapter updated successfully'
    });
  } catch (error) {
    console.error('Update chapter error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating chapter'
    });
  }
});

// Delete chapter (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete related data (cascading will happen automatically due to foreign key constraints)
    await db.query('DELETE FROM chapters WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Chapter deleted successfully'
    });
  } catch (error) {
    console.error('Delete chapter error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting chapter'
    });
  }
});

// Reorder chapters (admin only)
router.put('/reorder/:courseId', verifyToken, isAdmin, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { chapterOrders } = req.body; // [{id: 1, order: 2}, {id: 2, order: 1}]
    
    // Use transaction to ensure all orders are updated
    await db.query('START TRANSACTION');
    
    for (const item of chapterOrders) {
      await db.query(
        'UPDATE chapters SET chapter_order = ? WHERE id = ? AND course_id = ?',
        [item.order, item.id, courseId]
      );
    }
    
    await db.query('COMMIT');
    
    res.json({
      success: true,
      message: 'Chapters reordered successfully'
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Reorder chapters error:', error);
    res.status(500).json({
      success: false,
      message: 'Error reordering chapters'
    });
  }
});

module.exports = router;
