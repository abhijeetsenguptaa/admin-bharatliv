const express = require('express');
const { PostMoviesController, GetMoviesController, upload } = require('../controllers/movies.controller');

const moviesRouter = express.Router();

moviesRouter.post('/post-movies', upload.fields([{ name: 'thumbNail' }, { name: 'video' }]), PostMoviesController);
moviesRouter.get('/', GetMoviesController);


module.exports = moviesRouter;
