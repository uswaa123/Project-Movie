const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const otpMiddleware = require('../middlewares/otpMiddleware');
const { signupSchema, loginSchema, otpSchema, resendOtpSchema, forgotPasswordSchema, resetPasswordSchema } = require('../validators/authValidators');
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

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/verify-otp', validate(otpSchema), otpMiddleware, authController.verifyOtp);
router.post('/resend-otp', validate(resendOtpSchema), authController.resendOtp);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), otpMiddleware, authController.resetPassword);
router.get('/me', authMiddleware, authController.me);

module.exports = router; 