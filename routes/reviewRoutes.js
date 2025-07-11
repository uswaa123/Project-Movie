const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');
const { createReviewSchema, updateReviewSchema } = require('../validators/reviewValidators');
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

router.post('/movies/:id/reviews', authMiddleware, validate(createReviewSchema), reviewController.postReview);
router.put('/reviews/:id', authMiddleware, validate(updateReviewSchema), reviewController.updateReview);
router.delete('/reviews/:id', authMiddleware, reviewController.deleteReview);
router.get('/movies/:id/reviews', reviewController.getReviewsByMovie);
router.get('/reviews/user/:userId', reviewController.getReviewsByUser);

module.exports = router; 