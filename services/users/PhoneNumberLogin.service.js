const UsersModel = require("../../models/users.model");
const bcrypt = require('bcrypt');
const OtpGeneratorService = require("./OtpGenerator.service");


async function PhoneNumberLoginService(phoneNumber) {
    try {
        // Generate OTP
        // const otp = OtpGeneratorService(6);
        const otp = "0000";
        const hashOTP = bcrypt.hashSync(otp, 6);

        // Extract last 4 digits of phone number for name
        const name = "User" + phoneNumber.slice(-4);

        // Check if user exists
        const user = await UsersModel.findOne({ where: { phoneNumber: phoneNumber } });

        if (user) {
            // Update existing user's OTP
            user.phoneNumberOTP = hashOTP;
            await user.save();

            return {
                status: true,
                message: "OTP has been sent to the phone number.",
                otp: otp
            };
        } else {
            // Create new user with OTP
            await UsersModel.create({ name, phoneNumber: phoneNumber, phoneNumberOTP: hashOTP });

            return {
                status: true,
                message: "OTP has been sent to the phone number.",
                otp: otp
            };
        }
    } catch (error) {
        console.error("Error in OTP generation and storage:", error.message);
        return {
            status: false,
            message: "An error occurred while generating and storing OTP. Please try again later."
        };
    }
}

module.exports = PhoneNumberLoginService;
