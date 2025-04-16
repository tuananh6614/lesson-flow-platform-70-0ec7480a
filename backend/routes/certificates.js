
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken } = require('../middleware/auth');

// Get all certificates for a user
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    
    const [certificates] = await db.query(`
      SELECT c.*, co.title as course_title 
      FROM certificates c
      JOIN courses co ON c.course_id = co.id
      WHERE c.user_id = ?
    `, [user_id]);
    
    res.json({
      success: true,
      certificates
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching certificates'
    });
  }
});

// Get certificate by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    
    const [certificates] = await db.query(`
      SELECT c.*, co.title as course_title, u.full_name
      FROM certificates c
      JOIN courses co ON c.course_id = co.id
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ? AND c.user_id = ?
    `, [id, user_id]);
    
    if (certificates.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found or unauthorized'
      });
    }
    
    res.json({
      success: true,
      certificate: certificates[0]
    });
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching certificate'
    });
  }
});

// Verify certificate (public endpoint)
router.get('/verify/:certificateUrl', async (req, res) => {
  try {
    const { certificateUrl } = req.params;
    
    const [certificates] = await db.query(`
      SELECT c.*, co.title as course_title, u.full_name
      FROM certificates c
      JOIN courses co ON c.course_id = co.id
      JOIN users u ON c.user_id = u.id
      WHERE c.certificate_url = ?
    `, [certificateUrl]);
    
    if (certificates.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    res.json({
      success: true,
      isValid: true,
      certificate: {
        course_title: certificates[0].course_title,
        full_name: certificates[0].full_name,
        issued_at: certificates[0].issued_at
      }
    });
  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying certificate'
    });
  }
});

module.exports = router;
