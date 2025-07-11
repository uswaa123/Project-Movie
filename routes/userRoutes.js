const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { updateProfileSchema } = require('../validators/userValidators');
const { z } = require('zod');

function validate(schema) {
  return (req, res, next) => {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: [{ message: 'Request body is required and must be a JSON object.' }]
      });
    }
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      res.status(400).json({ success: false, message: 'Validation error', errors: err.errors });
    }
  };
}

router.get('/me', authMiddleware, userController.getProfile);
router.put('/me', authMiddleware, validate(updateProfileSchema), userController.updateProfile);
router.delete('/me', authMiddleware, userController.deleteProfile);

module.exports = router; 