const express = require('express');
const { PostCategoryController, EditCategoryController, DeleteCategoryController, HandleStatusCategoryController, upload, GetCategoryController, ApproveCategoryItemController, RequestForDeleteCategoryItemController } = require('../controllers/category.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');


const categoryRoutes = express.Router();

categoryRoutes.post('/post-categories', PostCategoryController);
categoryRoutes.get('/', GetCategoryController);
categoryRoutes.patch('/edit-categories/:id', upload.single('image'), authentication, authorize(['super-admin']), EditCategoryController);
categoryRoutes.delete('/delete-categories/:id', DeleteCategoryController);
categoryRoutes.post('/change-status/:id', HandleStatusCategoryController);

module.exports = categoryRoutes;