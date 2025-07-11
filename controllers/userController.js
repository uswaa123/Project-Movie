const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/responseFactory');

const userController = {
  async getProfile(req, res) {
    try {
      const user = await userService.getProfile(req.user.id);
      return successResponse(res, 'Profile fetched.', user);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async updateProfile(req, res) {
    try {
      const user = await userService.updateProfile(req.user.id, req.body);
      return successResponse(res, 'Profile updated.', user);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async deleteProfile(req, res) {
    try {
      await userService.deleteProfile(req.user.id);
      return successResponse(res, 'Account deleted.');
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }
};

module.exports = userController; 