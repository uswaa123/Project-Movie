const adminService = require('../services/adminService');
const { successResponse, errorResponse } = require('../utils/responseFactory');

const adminController = {
  async addMovie(req, res) {
    try {
      const movie = await adminService.addMovie(req.body);
      return successResponse(res, 'Movie added.', movie, 201);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async updateMovie(req, res) {
    try {
      const movie = await adminService.updateMovie(req.params.id, req.body);
      return successResponse(res, 'Movie updated.', movie);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async deleteMovie(req, res) {
    try {
      await adminService.deleteMovie(req.params.id);
      return successResponse(res, 'Movie deleted.');
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async getAllMovies(req, res) {
    try {
      const movies = await adminService.getAllMovies();
      return successResponse(res, 'All movies fetched.', movies);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }
};

module.exports = adminController; 