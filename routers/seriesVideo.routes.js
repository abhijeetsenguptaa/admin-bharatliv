const express = require('express');
const { PostSeriesVideoController, upload, GetSeriesVideoController, DeleteSeriesVideoController, HandleStatusSeriesVideoController } = require('../controllers/seriesVideo.controller');

const seriesVideoRoutes = express.Router();

seriesVideoRoutes.post('/post-series-video', upload.fields([{ name: 'thumbNail' }, { name: 'video' }]), PostSeriesVideoController);
seriesVideoRoutes.get('/', GetSeriesVideoController);
seriesVideoRoutes.delete('/delete-series-video/:id', DeleteSeriesVideoController);
seriesVideoRoutes.post('/change-status/:id', HandleStatusSeriesVideoController);


module.exports = seriesVideoRoutes;
