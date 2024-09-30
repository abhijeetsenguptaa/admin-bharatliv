const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const { upload, PostAudioSubCategoryController, GetAudioSubCategoryController, DeleteAudioSubCategoryController, HandleStatusAudioSubCategoryController, EditAudioSubCategoryController } = require('../controllers/audioSubCategory.controller');


const audioSubCategoryRoutes = express.Router();

audioSubCategoryRoutes.post('/post-audio-sub-categories', upload.single('image'), PostAudioSubCategoryController);
audioSubCategoryRoutes.get('/', GetAudioSubCategoryController);
audioSubCategoryRoutes.post('/edit-audio-sub-categories/:id', upload.single('image'), EditAudioSubCategoryController);
audioSubCategoryRoutes.delete('/delete-audio-sub-categories/:id', DeleteAudioSubCategoryController);
audioSubCategoryRoutes.post('/change-status/:id', HandleStatusAudioSubCategoryController);

module.exports = audioSubCategoryRoutes;