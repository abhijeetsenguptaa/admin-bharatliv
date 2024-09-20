const UsersModel = require("../../models/users.model");
const bcrypt = require('bcrypt');
const JsonTokenGenerator = require("./JsonTokenGenerator.service");

async function OtpNumberVerifyService(phoneNumber, phoneNumberOTP) {
    try {
        // Find user by phone number
        const user = await UsersModel.findOne({ where: { phoneNumber: phoneNumber } });

        // Check if user exists
        if (!user) {
            return {
                status: false,
                message: "User with the provided phone number does not exist."
            };
        }

        // Verify OTP
        const otpMatch = await bcrypt.compare(phoneNumberOTP, user.phoneNumberOTP);

        // Handle OTP verification result
        if (otpMatch) {
            // Update user's verification status
            user.isNumberVerified = true;
            await user.save();

            // Generate JWT token
            const token = JsonTokenGenerator(user.id);

            // Return success response
            return {
                status: true,
                message: "OTP verification successful.",
                token: token
            };
        } else {
            // Incorrect OTP
            return {
                status: false,
                message: "OTP verification failed. Incorrect OTP."
            };
        }
    } catch (error) {
        console.error("Error in OTP verification:", error.message);
        return {
            status: false,
            message: "An error occurred while verifying OTP. Please try again later."
        };
    }
}

module.exports = OtpNumberVerifyService;
