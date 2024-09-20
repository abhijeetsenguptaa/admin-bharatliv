const express = require('express');
const { upload, UploadBannerController, GetBannerController, StatusChangeController, DeleteBannerController } = require('../controllers/banner.controller');

const bannerRoutes = express.Router();


bannerRoutes.post('/upload-banner', upload.single('image'), UploadBannerController);
bannerRoutes.get('/', GetBannerController);
bannerRoutes.post('/change-status/:id', StatusChangeController);
bannerRoutes.delete('/delete-banner/:id', DeleteBannerController);

module.exports = bannerRoutes;