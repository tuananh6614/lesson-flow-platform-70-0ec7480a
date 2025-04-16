
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const [courses] = await db.query(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM chapters WHERE course_id = c.id) as chapter_count,
        (SELECT COUNT(*) FROM enrollment WHERE course_id = c.id) as student_count
      FROM courses c
      WHERE c.status = 'active'
    `);
    
    res.json({
      success: true,
      courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses'
    });
  }
});

// Get course by ID with chapters and lessons
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Get course details
    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    const course = courses[0];
    
    // Get chapters
    const [chapters] = await db.query(
      'SELECT * FROM chapters WHERE course_id = ? ORDER BY chapter_order',
      [id]
    );
    
    // Get lessons for each chapter
    const chaptersWithLessons = await Promise.all(
      chapters.map(async (chapter) => {
        const [lessons] = await db.query(
          'SELECT * FROM lessons WHERE chapter_id = ? ORDER BY lesson_order',
          [chapter.id]
        );
        return {
          ...chapter,
          lessons
        };
      })
    );
    
    // Get enrollment count
    const [enrollmentCount] = await db.query(
      'SELECT COUNT(*) as count FROM enrollment WHERE course_id = ?',
      [id]
    );
    
    res.json({
      success: true,
      course: {
        ...course,
        chapters: chaptersWithLessons,
        student_count: enrollmentCount[0].count
      }
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course details'
    });
  }
});

// Create course (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, description, thumbnail, status = 'active' } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO courses (title, description, thumbnail, status) VALUES (?, ?, ?, ?)',
      [title, description, thumbnail, status]
    );
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course_id: result.insertId
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating course'
    });
  }
});

// Update course (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, thumbnail, status } = req.body;
    
    await db.query(
      'UPDATE courses SET title = ?, description = ?, thumbnail = ?, status = ? WHERE id = ?',
      [title, description, thumbnail, status, id]
    );
    
    res.json({
      success: true,
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating course'
    });
  }
});

// Delete course (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete related data (cascading will happen automatically due to foreign key constraints)
    await db.query('DELETE FROM courses WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting course'
    });
  }
});

module.exports = router;
