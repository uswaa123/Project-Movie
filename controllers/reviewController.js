const reviewService = require('../services/reviewService');
const { successResponse, errorResponse } = require('../utils/responseFactory');

const reviewController = {
  async postReview(req, res) {
    try {
      const review = await reviewService.postReview(req.user.id, req.params.id, req.body);
      return successResponse(res, 'Review posted.', review, 201);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async updateReview(req, res) {
    try {
      const review = await reviewService.updateReview(req.params.id, req.user.id, req.body);
      return successResponse(res, 'Review updated.', review);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async deleteReview(req, res) {
    try {
      await reviewService.deleteReview(req.params.id, req.user.id);
      return successResponse(res, 'Review deleted.');
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async getReviewsByMovie(req, res) {
    try {
      const reviews = await reviewService.getReviewsByMovie(req.params.id);
      return successResponse(res, 'Reviews for movie fetched.', reviews);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async getReviewsByUser(req, res) {
    try {
      const reviews = await reviewService.getReviewsByUser(req.params.userId);
      return successResponse(res, 'Reviews by user fetched.', reviews);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }
};

module.exports = reviewController; 