const express = require('express');
const { PostPdfController, EditPdfController, DeletePdfController, HandleStatusPdfController, GetPdfController, upload } = require('../controllers/pdf.controller');


const documentRoutes = express.Router();

documentRoutes.post('/post-document', upload.single('file'), PostPdfController);
documentRoutes.get('/', GetPdfController);
documentRoutes.patch('/edit-document/:id', upload.single('image'), EditPdfController);
documentRoutes.delete('/delete-document/:id', DeletePdfController);
documentRoutes.post('/handle-status/:id', HandleStatusPdfController);

module.exports = documentRoutes;