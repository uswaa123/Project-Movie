const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/responseFactory');

const authController = {
  async signup(req, res) {
    try {
      const user = await authService.signup(req.body);
      return successResponse(res, 'Signup successful. OTP sent to your email.', user, 201);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async verifyOtp(req, res) {
    try {
      await authService.verifyOtp(req.body);
      return successResponse(res, 'OTP verified. You can now login.');
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async resendOtp(req, res) {
    try {
      await authService.resendOtp(req.body);
      return successResponse(res, 'OTP resent to your email.');
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async login(req, res) {
    try {
      const data = await authService.login(req.body);
      return successResponse(res, 'Login successful.', data);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async logout(req, res) {
    // For JWT, logout is handled client-side by deleting the token.
    return successResponse(res, 'Logout successful.');
  },
  async forgotPassword(req, res) {
    try {
      await authService.forgotPassword(req.body);
      return successResponse(res, 'OTP sent to your email for password reset.');
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async resetPassword(req, res) {
    try {
      await authService.resetPassword(req.body);
      return successResponse(res, 'Password reset successful.');
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
  async me(req, res) {
    try {
      const user = await authService.getMe(req.user.id);
      return successResponse(res, 'User info fetched.', user);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }
};

module.exports = authController; 