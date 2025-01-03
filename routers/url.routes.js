const express = require('express');
const { UploadUrlController, FetchUrlController } = require('../controllers/url.controller');

const urlRoutes = express.Router();

urlRoutes.post('/post-url', UploadUrlController);
urlRoutes.get('/get-url', FetchUrlController);


module.exports = urlRoutes;