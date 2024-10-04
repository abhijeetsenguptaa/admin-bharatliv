const express = require('express');
const { PostSeriesController, GetSeriesController, DeleteSeriesController, HandleStatusSeriesController, upload, EditSeriesController } = require('../controllers/series.controller');


const seriesRoutes = express.Router();

seriesRoutes.post('/post-series', upload.single('image'), PostSeriesController);
seriesRoutes.get('/', GetSeriesController);
seriesRoutes.post('/edit-series/:id', upload.single('image'), EditSeriesController);
seriesRoutes.delete('/delete-series/:id', DeleteSeriesController);
seriesRoutes.post('/change-status/:id', HandleStatusSeriesController);

module.exports = seriesRoutes;