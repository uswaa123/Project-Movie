const { pool } = require('../config/db');

const otpRepo = {
  async create(userId, code, expiresAt) {
    await pool.query('UPDATE users SET otp_code = ?, otp_expiresAt = ? WHERE id = ?', [code, expiresAt, userId]);
    return true;
  },
  async findByUserId(userId) {
    const [rows] = await pool.query('SELECT otp_code, otp_expiresAt FROM users WHERE id = ?', [userId]);
    return rows[0];
  },
  async verifyOtp(userId, code) {
    const [rows] = await pool.query('SELECT otp_code, otp_expiresAt FROM users WHERE id = ?', [userId]);
    if (!rows.length) return false;
    const otp = rows[0];
    if (otp.otp_code !== code) return false;
    if (new Date() > new Date(otp.otp_expiresAt)) return false;
    return true;
  },
  async clearOtp(userId) {
    await pool.query('UPDATE users SET otp_code = NULL, otp_expiresAt = NULL WHERE id = ?', [userId]);
    return true;
  },
};

module.exports = otpRepo;
