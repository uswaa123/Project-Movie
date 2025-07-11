const { z } = require('zod');

const createMovieSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  releaseDate: z.string().optional(), // Expect YYYY-MM-DD
  genre: z.string().optional(),
  cast: z.string().optional(),
});

const updateMovieSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  releaseDate: z.string().optional(),
  genre: z.string().optional(),
  cast: z.string().optional(),
});

const movieIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

module.exports = {
  createMovieSchema,
  updateMovieSchema,
  movieIdParamSchema,
}; 