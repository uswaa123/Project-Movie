const movieRepo = require('../repos/movieRepo');

const adminService = {
  async addMovie(data) {
    const { title, description, releaseDate, genre, cast } = data;
    if (!title) throw new Error('Title is required.');
    const movie = await movieRepo.create({
      title,
      description,
      releaseDate,
      genre,
      cast,
      ratingsAvg: 0,
    });
    return movie;
  },

  async updateMovie(id, data) {
    const movie = await movieRepo.findById(id);
    if (!movie) throw new Error('Movie not found.');
    const updates = {};
    if (data.title) updates.title = data.title;
    if (data.description) updates.description = data.description;
    if (data.releaseDate) updates.releaseDate = data.releaseDate;
    if (data.genre) updates.genre = data.genre;
    if (data.cast) updates.cast = data.cast;
    if (Object.keys(updates).length === 0) throw new Error('No valid fields to update.');
    const updated = await movieRepo.update(id, updates);
    return updated;
  },

  async deleteMovie(id) {
    const movie = await movieRepo.findById(id);
    if (!movie) throw new Error('Movie not found.');
    await movieRepo.delete(id);
    return true;
  },

  async getAllMovies() {
    return movieRepo.findAll();
  },
};

module.exports = adminService; 