const express = require('express');
const { upload, PostReelAdminController, GetReelsAdminController } = require('../controllers/reel-admin.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const ReelsAdminLikesController = require('../controllers/reel-likes.controller');
const { ReelsAdminCommentController } = require('../controllers/reel-comment.controller');

const reelAdminRoutes = express.Router();

reelAdminRoutes.post('/post-reel-admin', upload.fields([{ name: 'thumbNail' }, { name: 'video' }]), PostReelAdminController);
reelAdminRoutes.get('/', GetReelsAdminController);
reelAdminRoutes.post('/like/:reelsAdminID', authentication, authorize(['customer']), ReelsAdminLikesController);
reelAdminRoutes.post('/comment/:adminReelID', authentication, authorize(['customer']), ReelsAdminCommentController);

module.exports = reelAdminRoutes;
