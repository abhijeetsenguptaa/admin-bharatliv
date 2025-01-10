const express = require('express');
const { upload, PostReelAdminController } = require('../controllers/reel-admin.controller');

const reelAdminRoutes = express.Router();

reelAdminRoutes.post('/post-reel-admin', upload.fields([{ name: 'thumbNail' }, { name: 'video' }]), PostReelAdminController);


module.exports = reelAdminRoutes;
