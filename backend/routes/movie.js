const express=require('express');
const { addMovie, getMovies, getMovie } = require('../controllers/movieController');
const router=express.Router();

router.route('/addmovie').post(addMovie);
router.route('/getmovies').get(getMovies);
router.route('/movie/:id').get(getMovie);

module.exports = router;