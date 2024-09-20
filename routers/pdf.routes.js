const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const { PostPdfController, EditPdfController, DeletePdfController, HandleStatusPdfController, GetPdfController, upload } = require('../controllers/pdf.controller');


const documentRoutes = express.Router();

documentRoutes.post('/post-document', upload.single('file'), authentication, authorize(['super-admin']), PostPdfController);
documentRoutes.get('/', GetPdfController);
documentRoutes.patch('/edit-document/:id', upload.single('image'), authentication, authorize(['super-admin']), EditPdfController);
documentRoutes.delete('/delete-document/:id', authentication, authorize(['super-admin']), DeletePdfController);
documentRoutes.post('/handle-status/:id', authentication, authorize(['super-admin']), HandleStatusPdfController);

module.exports = documentRoutes;