const express = require('express');
const { RegisterAdminController, LoginAdminController, MyProfileController } = require('../controllers/admin.controller');
const { authentication } = require('../middleware/authentication.middleware');


const adminRoutes = express.Router();

adminRoutes.post('/register', RegisterAdminController);
adminRoutes.post('/login', LoginAdminController);
adminRoutes.get('/my-profile', authentication, MyProfileController);


module.exports = adminRoutes;