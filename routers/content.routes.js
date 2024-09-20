const express = require('express');
const { PostContentController, upload, GetContentController, EditContentController, ApproveFromSuperAdminController, ContentAsPerManagerController, GetContentSuperAdminController, DeleteContentController, HandleStatusContentController } = require('../controllers/content.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const { LikeUserController, CommentUserController, EditCommentUserController, DeleteCommentUserController } = require('../controllers/userInteraction.controller');

const contentRoutes = express.Router();

contentRoutes.post('/post-content', upload.fields([{ name: 'thumbNail' }, { name: 'video' }]), PostContentController);
contentRoutes.get('/get-content', GetContentController);
contentRoutes.get('/get-content/super-admin', GetContentSuperAdminController);
contentRoutes.get('/videos', authentication, authorize(['manager']), ContentAsPerManagerController);
contentRoutes.patch('/edit-content/:id', authentication, authorize(['super-admin']), upload.fields([{ name: 'thumbNail' }, { name: 'video' }]), EditContentController);
contentRoutes.post('/approve-content/:id', authentication, authorize(['super-admin']), ApproveFromSuperAdminController);
contentRoutes.delete('/delete-content/:id', DeleteContentController);
contentRoutes.post('/change-status/:id', HandleStatusContentController);
contentRoutes.post('/like/:contentID', authentication, authorize(['customer']), LikeUserController);
contentRoutes.post('/comment/:contentID', authentication, authorize(['customer']), CommentUserController);
contentRoutes.patch('/comment/edit/:commentID', authentication, authorize(['customer']), EditCommentUserController);
contentRoutes.delete('/comment/delete/:commentID', authentication, authorize(['super-admin']), DeleteCommentUserController);


module.exports = contentRoutes;
