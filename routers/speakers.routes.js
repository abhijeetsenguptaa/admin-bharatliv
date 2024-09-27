const express = require('express');
const { UploadSpeakersController, GetSpeakersController, upload, StatusChangeController, DeleteSpeakerController, EditSpeakerController } = require('../controllers/speakers.controller');

const speakerRoutes = express.Router();


speakerRoutes.post('/upload-speakers', upload.single('image'), UploadSpeakersController);
speakerRoutes.get('/', GetSpeakersController);
speakerRoutes.post('/change-status/:id', StatusChangeController);
speakerRoutes.delete('/delete-speakers/:id', DeleteSpeakerController);
speakerRoutes.post('/edit-speakers/:id', upload.single('image'), EditSpeakerController);



module.exports = speakerRoutes;