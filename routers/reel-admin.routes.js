const express = require('express');
const { upload, PostReelAdminController, GetReelsAdminController } = require('../controllers/reel-admin.controller');

const reelAdminRoutes = express.Router();

reelAdminRoutes.post('/post-reel-admin', upload.fields([{ name: 'thumbNail' }, { name: 'video' }]), PostReelAdminController);
reelAdminRoutes.get('/', GetReelsAdminController);


module.exports = reelAdminRoutes;
