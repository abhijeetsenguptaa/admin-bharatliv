const express = require('express');
const { LoginWithPhoneNumberController, PhoneOtpVerificationController, EmailRegistrationController, EmailLoginController, FetchAllUserController, FetchMyProfileController, DeleteUserController, EditUserDetailsController, upload, ForgotPasswordController } = require('../controllers/users.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');

const userRoutes = express.Router();

userRoutes.post('/login-phone', LoginWithPhoneNumberController);
userRoutes.post('/verify-otp', PhoneOtpVerificationController);
userRoutes.post('/email-register', upload.single('image'), EmailRegistrationController);
userRoutes.post('/email-login', EmailLoginController);
userRoutes.post('/edit-my-profile', authentication, upload.single('image'), EditUserDetailsController);
userRoutes.get('/', FetchAllUserController);
userRoutes.get('/my-profile', authentication, FetchMyProfileController);
userRoutes.delete('/delete-user/:id', authentication, authorize(['super-admin']), DeleteUserController);
userRoutes.post('/forgot-password', authentication, authorize(['super-admin', 'manager']), ForgotPasswordController);


module.exports = userRoutes;