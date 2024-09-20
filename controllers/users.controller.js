const EditMyProfile = require("../services/users/EditMyProfile.service");
const EmailLoginService = require("../services/users/EmailLogin.service");
const EmailRegisterService = require("../services/users/EmailRegister.service");
const FetchUserService = require("../services/users/GetUsers.service");
const MyProfileService = require("../services/users/MyProfile.service");
const OtpNumberVerifyService = require("../services/users/OtpNumberVerify.service");
const PhoneNumberLoginService = require("../services/users/PhoneNumberLogin.service");
const DeleteUsersService = require("../services/users/deleteUsers.service");
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const CategoryModel = require('../models/category.model');
const UsersModel = require("../models/users.model");
const ForgetPasswordService = require("../services/users/forgetPassword.service");

aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: process.env.REGION,
    // Note: 'bucket' is not a valid AWS SDK configuration property
});

const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new aws.S3();


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // Set the folder path within the bucket where you want to store the files
            const folderPath = 'users/';
            // Get the current date in the format 'YYYY-MM-DD'
            const currentDate = new Date().toISOString().split('T')[0];
            // Get the file extension
            const fileExtension = file.originalname.split('.').pop();
            // Generate a unique key using the current date and file extension
            const uniqueKey = currentDate + '-' + Math.floor(Math.random() * 10000) + '.' + fileExtension;
            // Concatenate the folder path and the unique key to form the complete key
            const completeKey = folderPath + uniqueKey;
            cb(null, completeKey);
        }
    })
});
async function LoginWithPhoneNumberController(req, res) {
    try {
        const { phoneNumber } = req.body;
        const userLogin = await PhoneNumberLoginService(phoneNumber);

        return res.status(userLogin.status ? 200 : 500).json({
            status: userLogin.status,
            message: userLogin.message,
            otp: userLogin.otp
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function PhoneOtpVerificationController(req, res) {
    try {
        const { phoneNumber, phoneNumberOTP } = req.body;
        const otpVerify = await OtpNumberVerifyService(phoneNumber, phoneNumberOTP);

        return res.status(otpVerify.status ? 200 : 500).json({
            status: otpVerify.status,
            message: otpVerify.message,
            token: otpVerify.token
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function EmailRegistrationController(req, res) {
    try {
        const { name, email, password, role, bio } = req.body;

        let image;
        if (req.file) {
            image = req.file.location;
        }


        const EmailRegister = await EmailRegisterService(name, email, password, role, image, bio);

        return res.status(EmailRegister.status ? 200 : 500).json({
            status: EmailRegister.status,
            message: EmailRegister.message,
            data: EmailRegister.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function EmailLoginController(req, res) {
    try {
        const { email, password } = req.body;
        const emailLogin = await EmailLoginService(email, password);

        return res.status(emailLogin.status ? 200 : 404).json({
            status: emailLogin.status,
            message: emailLogin.message,
            token: emailLogin.token,
            data: emailLogin.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function FetchAllUserController(req, res) {
    try {
        const { id, role, paidMember } = req.query;

        const user = await FetchUserService(id, role, paidMember);

        return res.status(user.status ? 200 : 404).json({
            status: user.status,
            count: user.count,
            message: user.message,
            data: user.data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


async function FetchMyProfileController(req, res) {
    try {
        const userID = req.userID;


        const myProfileDetails = await MyProfileService(userID);

        return res.status(myProfileDetails.status ? 200 : 404).json({
            status: myProfileDetails.status,
            message: myProfileDetails.message,
            data: myProfileDetails.data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

async function DeleteUserController(req, res) {
    try {
        const id = req.params.id;
        const data = await UsersModel.findByPk(id);

        const imageKey = data.image.split('/').pop();
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'users/' + imageKey }).promise();

        const DeleteUser = await DeleteUsersService(id);

        return res.status(DeleteUser.status ? 200 : 500).json({
            status: DeleteUser.status,
            message: DeleteUser.message
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error
        });
    }
}

async function EditUserDetailsController(req, res) {
    try {
        const userID = req.userID;
        const { name, email, password, phoneNumber, gender, bio } = req.body;
        const userItem = await UsersModel.findOne({ where: { id: userID } });

        // Check if there's a new image uploaded
        let image;
        if (req.file) {
            if (userItem.image != null) {
                // Extract the key from the image URL
                const imageUrlParts = userItem.image.split('/');
                const imageKey = imageUrlParts[imageUrlParts.length - 1];

                // Delete the image from S3 storage
                await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'users/' + imageKey }).promise();
                image = req.file.location;
            } else {
                image = req.file.location;
            }

        }

        const editProfile = await EditMyProfile(userID, name, email, password, phoneNumber, gender, image, bio);

        return res.status(editProfile.status ? 200 : 500).json({
            status: editProfile.status,
            message: editProfile.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error
        });
    }
}

async function ForgotPasswordController(req, res) {
    try {
        const userID = req.userID;
        const { newPassword, repeatPassword } = req.body;

        const userUpdateData = await ForgetPasswordService(userID, newPassword, repeatPassword);

        return res.status(userUpdateData.status ? 200 : 404).json({
            status: userUpdateData.status,
            message: userUpdateData.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error
        });
    }
}

module.exports = { LoginWithPhoneNumberController, PhoneOtpVerificationController, EmailRegistrationController, EmailLoginController, FetchAllUserController, FetchMyProfileController, DeleteUserController, EditUserDetailsController, ForgotPasswordController, upload };
