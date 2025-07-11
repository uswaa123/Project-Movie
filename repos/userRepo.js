const { pool } = require('../config/db');

const userRepo = {
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  async create(user) {
    const { name, email, passwordHash, role, isVerified, otp_code, otp_expiresAt } = user;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, passwordHash, role, isVerified, otp_code, otp_expiresAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, passwordHash, role || 'user', isVerified || false, otp_code || null, otp_expiresAt || null]
    );
    return { id: result.insertId, ...user };
  },
  async update(id, updates) {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    await pool.query(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  },
  async delete(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
  },
};

module.exports = userRepo; 