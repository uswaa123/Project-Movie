const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { createMovieSchema, updateMovieSchema } = require('../validators/movieValidators');
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

router.post('/movies', authMiddleware, roleMiddleware('admin'), validate(createMovieSchema), adminController.addMovie);
router.put('/movies/:id', authMiddleware, roleMiddleware('admin'), validate(updateMovieSchema), adminController.updateMovie);
router.delete('/movies/:id', authMiddleware, roleMiddleware('admin'), adminController.deleteMovie);
router.get('/movies', authMiddleware, roleMiddleware('admin'), adminController.getAllMovies);

module.exports = router; 