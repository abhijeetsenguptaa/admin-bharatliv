const bcrypt = require('bcrypt');
const AdminModel = require('../../models/admin.model');

async function RegisterAdminService(name, email, password) {
    try {
        // Check if the admin with the given email already exists
        const isAdmin = await AdminModel.findOne({ where: { email: email } });

        if (isAdmin) {
            // If the super admin already exists, return a failure status
            return {
                status: false,
                message: "Email is already registered."
            };
        }

        // Hash the password with the specified number of salt rounds
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const adminRegister = await AdminModel.create({ name, email, password: hashedPassword });

        return {
            status: true,
            message: "Admin registered successfully!",
            data: adminRegister
        }
    } catch (error) {
        // Log the error and return a failure status
        console.error("Error in admin registration:", error.message);
        return {
            status: false,
            message: "An error occurred during admin registration. Please try again later."
        };
    }
}


module.exports = RegisterAdminService;