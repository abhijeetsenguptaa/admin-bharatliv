const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const { PostReelController, HandleAdminApprovalController, GetReelController, upload, DeleteReelController } = require('../controllers/reels.controller');

const reelsRoutes = express.Router();

reelsRoutes.post('/post-reel', upload.fields([{ name: 'thumbNail' }, { name: 'video' }]), authentication, PostReelController);
reelsRoutes.get('/get-reel', GetReelController);
reelsRoutes.delete('/delete-reel/:id', DeleteReelController);
reelsRoutes.post('/change-approval/:id', authentication, HandleAdminApprovalController);

module.exports = reelsRoutes;
