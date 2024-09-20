const bcrypt = require('bcrypt');
const JsonTokenGenerator = require('../../utils/JsonTokenGenerator.utils');
const AdminModel = require('../../models/admin.model');

async function LoginAdminService(email, password) {
    try {

        // Input validation
        if (!email || !password) {
            return {
                status: false,
                message: "Email and password are required."
            };

        }

        const isAdmin = await AdminModel.findOne({ where: { email: email } });

        if (!isAdmin) {
            return {
                status: false,
                message: "User does not exist!"
            };
        }

        const passwordMatch = await bcrypt.compare(password, isAdmin.password);

        if (passwordMatch) {
            const token = JsonTokenGenerator(isAdmin.id);
            isAdmin.token = token;
            await isAdmin.save();
            
            return {
                status: true,
                message: "Login successful",
                token: token,
                data: isAdmin
            };
        } else {
            return {
                status: false,
                message: "Wrong Credentials",
            };
        }
    } catch (error) {
        console.error("Error in user logging in:", error.message);
        return {
            status: false,
            message: "An error occurred during user logging in. Please try again later."
        }
    }
}

module.exports = LoginAdminService;