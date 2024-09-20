const UsersModel = require("../../models/users.model");
const bcrypt = require('bcrypt');

async function EmailRegisterService(name, email, password, role, image, bio) {
    try {
        // Check if user with the provided email already exists
        const existingUser = await UsersModel.findOne({ where: { email: email } });

        if (existingUser) {
            return {
                status: false,
                message: "User is already registered!"
            };
        }

        if (role == "speaker-admin" || role == "super-admin" || role == "manager") {
            paidMember = true;
            memberCategory = "prime-member";
        }

        // Hash the password
        const hashPassword = bcrypt.hashSync(password, 6);

        // Create a new user
        const newUser = await UsersModel.create({ name: name, email: email, password: hashPassword, role, image, gender: 'Others', paidMember, memberCategory, bio });

        // Return success response
        return {
            status: true,
            message: "User registration successful!",
            data: newUser // Optional: Return the newly created user
        };
    } catch (error) {
        console.error("Error in user registration:", error.message);
        return {
            status: false,
            message: "An error occurred during user registration. Please try again later."
        };
    }
}

module.exports = EmailRegisterService;
