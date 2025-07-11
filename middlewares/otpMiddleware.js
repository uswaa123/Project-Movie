const { pool } = require('../config/db');
const { errorResponse } = require('../utils/responseFactory');

async function otpMiddleware(req, res, next) {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return errorResponse(res, 'Email and OTP required', {}, 400);
  }
  try {
    const [rows] = await pool.query('SELECT otp_code, otp_expiresAt FROM users WHERE email = ?', [email]);
    if (!rows.length) {
      return errorResponse(res, 'User not found', {}, 400);
    }
    const user = rows[0];
    if (user.otp_code !== otp) {
      return errorResponse(res, 'Invalid OTP', {}, 400);
    }
    if (new Date() > new Date(user.otp_expiresAt)) {
      return errorResponse(res, 'OTP expired', {}, 400);
    }
    next();
  } catch (err) {
    return errorResponse(res, 'OTP check failed', {}, 500);
  }
}

module.exports = otpMiddleware; 