const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const { upload, PostAudioCategoryController, GetAudioCategoryController, DeleteAudioCategoryController, HandleStatusAudioCategoryController, EditAudioCategoryController } = require('../controllers/audioCategory.controller');


const audioCategoryRoutes = express.Router();

audioCategoryRoutes.post('/post-audio-categories', upload.single('image'), PostAudioCategoryController);
audioCategoryRoutes.get('/', GetAudioCategoryController);
audioCategoryRoutes.post('/edit-audio-categories/:id', upload.single('image'), EditAudioCategoryController);
audioCategoryRoutes.delete('/delete-audio-categories/:id', DeleteAudioCategoryController);
audioCategoryRoutes.post('/change-status/:id', HandleStatusAudioCategoryController);

module.exports = audioCategoryRoutes;