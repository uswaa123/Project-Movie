const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.listMovies);
router.get('/:id', movieController.getMovieById);

module.exports = router; 