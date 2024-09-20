const express = require('express');
const { UploadOrganizationController, upload, GetOrganizationController, StatusChangeController, DeleteOrganizationController } = require('../controllers/organization.controller');

const organizationRoute = express.Router();


organizationRoute.post('/upload-organization', upload.single('image'), UploadOrganizationController);
organizationRoute.get('/', GetOrganizationController);
organizationRoute.post('/change-status/:id', StatusChangeController);
organizationRoute.delete('/delete-organization/:id', DeleteOrganizationController);

module.exports = organizationRoute;