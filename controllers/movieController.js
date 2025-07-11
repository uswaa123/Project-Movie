const movieService = require('../services/movieService');
const { successResponse, errorResponse } = require('../utils/responseFactory');

const movieController = {
  async listMovies(req, res) {
    try {
      const movies = await movieService.listMovies();
      return successResponse(res, 'Movies fetched.', movies);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async getMovieById(req, res) {
    try {
      const movie = await movieService.getMovieById(req.params.id);
      return successResponse(res, 'Movie fetched.', movie);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }
};

module.exports = movieController; 