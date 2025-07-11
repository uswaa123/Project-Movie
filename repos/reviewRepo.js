const { pool } = require('../config/db');

const reviewRepo = {
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [id]);
    return rows[0];
  },
  async findByMovieId(movieId) {
    const [rows] = await pool.query('SELECT * FROM reviews WHERE movieId = ?', [movieId]);
    return rows;
  },
  async findByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM reviews WHERE userId = ?', [userId]);
    return rows;
  },
  async create(review) {
    const { movieId, userId, rating, comment } = review;
    const [result] = await pool.query(
      'INSERT INTO reviews (movieId, userId, rating, comment) VALUES (?, ?, ?, ?)',
      [movieId, userId, rating, comment || '']
    );
    return { id: result.insertId, ...review };
  },
  async update(id, updates) {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    await pool.query(`UPDATE reviews SET ${fields} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  },
  async delete(id) {
    await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
    return true;
  },
};

module.exports = reviewRepo; 