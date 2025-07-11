const { pool } = require('../config/db');

const movieRepo = {
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM movies WHERE id = ?', [id]);
    return rows[0];
  },
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM movies');
    return rows;
  },
  async create(movie) {
    const { title, description, releaseDate, genre, cast, ratingsAvg } = movie;
    const [result] = await pool.query(
      'INSERT INTO movies (title, description, releaseDate, genre, cast, ratingsAvg) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description || '', releaseDate || null, genre || '', cast || '', ratingsAvg || 0]
    );
    return { id: result.insertId, ...movie };
  },
  async update(id, updates) {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    await pool.query(`UPDATE movies SET ${fields} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  },
  async delete(id) {
    await pool.query('DELETE FROM movies WHERE id = ?', [id]);
    return true;
  },
};

module.exports = movieRepo; 