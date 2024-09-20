const express = require('express');
const { UploadSpeakersController, GetSpeakersController, upload, StatusChangeController, DeleteSpeakerController } = require('../controllers/speakers.controller');

const speakerRoutes = express.Router();


speakerRoutes.post('/upload-speakers', upload.single('image'), UploadSpeakersController);
speakerRoutes.get('/', GetSpeakersController);
speakerRoutes.post('/change-status/:id', StatusChangeController);
speakerRoutes.delete('/delete-speakers/:id', DeleteSpeakerController);



module.exports = speakerRoutes;