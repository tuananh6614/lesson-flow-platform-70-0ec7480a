
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all lessons for a chapter
router.get('/chapter/:chapterId', async (req, res) => {
  try {
    const { chapterId } = req.params;
    
    const [lessons] = await db.query(
      'SELECT * FROM lessons WHERE chapter_id = ? ORDER BY lesson_order',
      [chapterId]
    );
    
    res.json({
      success: true,
      lessons
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching lessons'
    });
  }
});

// Get lesson by ID with pages
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [lessons] = await db.query('SELECT * FROM lessons WHERE id = ?', [id]);
    
    if (lessons.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }
    
    const lesson = lessons[0];
    
    // Get pages
    const [pages] = await db.query(
      'SELECT * FROM pages WHERE lesson_id = ? ORDER BY page_number',
      [id]
    );
    
    res.json({
      success: true,
      lesson: {
        ...lesson,
        pages
      }
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching lesson'
    });
  }
});

// Create lesson (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { chapter_id, title, lesson_order } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO lessons (chapter_id, title, lesson_order) VALUES (?, ?, ?)',
      [chapter_id, title, lesson_order]
    );
    
    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      lesson_id: result.insertId
    });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating lesson'
    });
  }
});

// Update lesson (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, lesson_order } = req.body;
    
    await db.query(
      'UPDATE lessons SET title = ?, lesson_order = ? WHERE id = ?',
      [title, lesson_order, id]
    );
    
    res.json({
      success: true,
      message: 'Lesson updated successfully'
    });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating lesson'
    });
  }
});

// Delete lesson (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete related data (cascading will happen automatically due to foreign key constraints)
    await db.query('DELETE FROM lessons WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Lesson deleted successfully'
    });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting lesson'
    });
  }
});

// Create page for a lesson (admin only)
router.post('/:lessonId/pages', verifyToken, isAdmin, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { page_number, page_type, content } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO pages (lesson_id, page_number, page_type, content) VALUES (?, ?, ?, ?)',
      [lessonId, page_number, page_type, content]
    );
    
    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      page_id: result.insertId
    });
  } catch (error) {
    console.error('Create page error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating page'
    });
  }
});

// Update page (admin only)
router.put('/pages/:pageId', verifyToken, isAdmin, async (req, res) => {
  try {
    const { pageId } = req.params;
    const { page_number, page_type, content } = req.body;
    
    await db.query(
      'UPDATE pages SET page_number = ?, page_type = ?, content = ? WHERE id = ?',
      [page_number, page_type, content, pageId]
    );
    
    res.json({
      success: true,
      message: 'Page updated successfully'
    });
  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating page'
    });
  }
});

// Delete page (admin only)
router.delete('/pages/:pageId', verifyToken, isAdmin, async (req, res) => {
  try {
    const { pageId } = req.params;
    
    await db.query('DELETE FROM pages WHERE id = ?', [pageId]);
    
    res.json({
      success: true,
      message: 'Page deleted successfully'
    });
  } catch (error) {
    console.error('Delete page error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting page'
    });
  }
});

// Reorder lessons (admin only)
router.put('/reorder/:chapterId', verifyToken, isAdmin, async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { lessonOrders } = req.body; // [{id: 1, order: 2}, {id: 2, order: 1}]
    
    // Use transaction to ensure all orders are updated
    await db.query('START TRANSACTION');
    
    for (const item of lessonOrders) {
      await db.query(
        'UPDATE lessons SET lesson_order = ? WHERE id = ? AND chapter_id = ?',
        [item.order, item.id, chapterId]
      );
    }
    
    await db.query('COMMIT');
    
    res.json({
      success: true,
      message: 'Lessons reordered successfully'
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Reorder lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Error reordering lessons'
    });
  }
});

module.exports = router;
