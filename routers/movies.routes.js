const express = require('express');
const { PostMoviesController, GetMoviesController, upload, HandleStatusMoviesController, DeleteMoviesController } = require('../controllers/movies.controller');

const moviesRouter = express.Router();

moviesRouter.post('/post-movies', upload.fields([{ name: 'thumbNail' }, { name: 'video' }]), PostMoviesController);
moviesRouter.get('/', GetMoviesController);
moviesRouter.post('/change-status/:id', HandleStatusMoviesController);
moviesRouter.delete('/delete-movies/:id', DeleteMoviesController);



module.exports = moviesRouter;
