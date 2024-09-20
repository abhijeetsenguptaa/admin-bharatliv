const bcrypt = require('bcrypt');
const UsersModel = require('../../models/users.model');

async function ForgetPasswordService(id, newPassword, repeatPassword) {
    try {
        // Validation
        if (!newPassword || !repeatPassword) {
            return {
                status: false,
                message: "Both new password and repeat password are required."
            };
        }

        const user = await UsersModel.findOne({ where: { id: id } });

        if (!user) {
            return {
                status: false,
                message: "User not found."
            };
        }

        if (newPassword !== repeatPassword) {
            return {
                status: false,
                message: "Passwords do not match."
            };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return {
            status: true,
            message: "Password changed successfully!"
        };
    } catch (error) {
        console.error("Error in ForgetPasswordService:", error.message);
        return {
            status: false,
            message: "An error occurred while changing the password. Please try again later."
        };
    }
}

module.exports = ForgetPasswordService;
