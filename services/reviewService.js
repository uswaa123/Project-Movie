const reviewRepo = require('../repos/reviewRepo');
const movieRepo = require('../repos/movieRepo');

const reviewService = {
  async postReview(userId, movieId, data) {
    const { rating, comment } = data;
    if (!rating) throw new Error('Rating is required.');
    const movie = await movieRepo.findById(movieId);
    if (!movie) throw new Error('Movie not found.');
    const review = await reviewRepo.create({ movieId, userId, rating, comment });
    return review;
  },

  async updateReview(reviewId, userId, data) {
    const review = await reviewRepo.findById(reviewId);
    if (!review) throw new Error('Review not found.');
    if (review.userId !== userId) throw new Error('Unauthorized.');
    const updates = {};
    if (data.rating) updates.rating = data.rating;
    if (data.comment) updates.comment = data.comment;
    if (Object.keys(updates).length === 0) throw new Error('No valid fields to update.');
    const updated = await reviewRepo.update(reviewId, updates);
    return updated;
  },

  async deleteReview(reviewId, userId) {
    const review = await reviewRepo.findById(reviewId);
    if (!review) throw new Error('Review not found.');
    if (review.userId !== userId) throw new Error('Unauthorized.');
    await reviewRepo.delete(reviewId);
    return true;
  },

  async getReviewsByMovie(movieId) {
    return reviewRepo.findByMovieId(movieId);
  },

  async getReviewsByUser(userId) {
    return reviewRepo.findByUserId(userId);
  },
};

module.exports = reviewService; 