const { z } = require('zod');

const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().max(1000).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

const reviewIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

const getReviewsByMovieSchema = z.object({
  movieId: z.string().regex(/^\d+$/),
});

const getReviewsByUserSchema = z.object({
  userId: z.string().regex(/^\d+$/),
});

module.exports = {
  createReviewSchema,
  updateReviewSchema,
  reviewIdParamSchema,
  getReviewsByMovieSchema,
  getReviewsByUserSchema,
}; 