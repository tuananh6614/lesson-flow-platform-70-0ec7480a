
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get enrollment status for a user and course
router.get('/status', verifyToken, async (req, res) => {
  try {
    const { course_id } = req.query;
    const user_id = req.user.id;
    
    if (!course_id) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required'
      });
    }
    
    const [enrollment] = await db.query(
      'SELECT * FROM enrollment WHERE user_id = ? AND course_id = ?',
      [user_id, course_id]
    );
    
    res.json({
      success: true,
      is_enrolled: enrollment.length > 0,
      enrollment: enrollment.length > 0 ? enrollment[0] : null
    });
  } catch (error) {
    console.error('Enrollment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking enrollment status'
    });
  }
});

// Get all enrollments for a user
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    
    const [enrollments] = await db.query(`
      SELECT e.*, c.title as course_title, c.thumbnail as course_thumbnail 
      FROM enrollment e 
      JOIN courses c ON e.course_id = c.id 
      WHERE e.user_id = ?
    `, [user_id]);
    
    res.json({
      success: true,
      enrollments
    });
  } catch (error) {
    console.error('Get user enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user enrollments'
    });
  }
});

// Enroll in a course
router.post('/', verifyToken, async (req, res) => {
  try {
    const { course_id } = req.body;
    const user_id = req.user.id;
    
    // Check if already enrolled
    const [existingEnrollment] = await db.query(
      'SELECT * FROM enrollment WHERE user_id = ? AND course_id = ?',
      [user_id, course_id]
    );
    
    if (existingEnrollment.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }
    
    // Create enrollment
    const [result] = await db.query(
      'INSERT INTO enrollment (course_id, user_id, progress_percent, status) VALUES (?, ?, ?, ?)',
      [course_id, user_id, 0, 'enrolled']
    );
    
    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      enrollment_id: result.insertId
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error enrolling in course'
    });
  }
});

// Update enrollment progress
router.put('/:id/progress', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { progress_percent } = req.body;
    const user_id = req.user.id;
    
    // Verify enrollment belongs to user
    const [enrollment] = await db.query(
      'SELECT * FROM enrollment WHERE id = ? AND user_id = ?',
      [id, user_id]
    );
    
    if (enrollment.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found or unauthorized'
      });
    }
    
    // Update progress
    await db.query(
      'UPDATE enrollment SET progress_percent = ? WHERE id = ?',
      [progress_percent, id]
    );
    
    // Check if course is completed
    if (progress_percent >= 100) {
      await db.query(
        'UPDATE enrollment SET status = ? WHERE id = ?',
        ['completed', id]
      );
      
      // Generate certificate if completed
      const course_id = enrollment[0].course_id;
      
      // Check if certificate already exists
      const [existingCertificate] = await db.query(
        'SELECT * FROM certificates WHERE user_id = ? AND course_id = ?',
        [user_id, course_id]
      );
      
      if (existingCertificate.length === 0) {
        // Generate certificate URL (in a real system, this would be more complex)
        const certificateUrl = `certificate-${user_id}-${course_id}-${Date.now()}.pdf`;
        
        await db.query(
          'INSERT INTO certificates (user_id, course_id, certificate_url) VALUES (?, ?, ?)',
          [user_id, course_id, certificateUrl]
        );
      }
    }
    
    res.json({
      success: true,
      message: 'Progress updated successfully'
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating progress'
    });
  }
});

// Mark enrollment as dropped
router.put('/:id/drop', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    
    // Verify enrollment belongs to user
    const [enrollment] = await db.query(
      'SELECT * FROM enrollment WHERE id = ? AND user_id = ?',
      [id, user_id]
    );
    
    if (enrollment.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found or unauthorized'
      });
    }
    
    await db.query(
      'UPDATE enrollment SET status = ? WHERE id = ?',
      ['dropped', id]
    );
    
    res.json({
      success: true,
      message: 'Course dropped successfully'
    });
  } catch (error) {
    console.error('Drop course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error dropping course'
    });
  }
});

// Get enrollment statistics for a course (admin only)
router.get('/stats/:courseId', verifyToken, isAdmin, async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Get enrollment counts by status
    const [stats] = await db.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'enrolled' THEN 1 ELSE 0 END) as enrolled,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'dropped' THEN 1 ELSE 0 END) as dropped
      FROM enrollment
      WHERE course_id = ?
    `, [courseId]);
    
    // Get average progress
    const [progress] = await db.query(`
      SELECT AVG(progress_percent) as avg_progress
      FROM enrollment
      WHERE course_id = ?
    `, [courseId]);
    
    res.json({
      success: true,
      stats: {
        ...stats[0],
        avg_progress: progress[0].avg_progress || 0
      }
    });
  } catch (error) {
    console.error('Enrollment stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollment statistics'
    });
  }
});

module.exports = router;
