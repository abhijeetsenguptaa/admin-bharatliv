const express = require('express');
const { PostLanguageController, GetLanguageController, StatusChangeController, DeleteLanguageController } = require('../controllers/langugage.controller');

const languageRoute = express.Router();


languageRoute.post('/upload-language', PostLanguageController);
languageRoute.get('/', GetLanguageController);
languageRoute.post('/change-status/:id', StatusChangeController);
languageRoute.delete('/delete-languages/:id', DeleteLanguageController);


module.exports = languageRoute;