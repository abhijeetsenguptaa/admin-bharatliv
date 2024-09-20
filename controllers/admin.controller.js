const LoginAdminService = require("../services/admin/loginAdmin.service");
const MyProfile = require("../services/admin/myProfile.service");
const RegisterAdminService = require("../services/admin/registerAdmin.service");

async function RegisterAdminController(req, res) {
    try {
        const { name, email, password } = req.body;

        const admin = await RegisterAdminService(name, email, password);

        return res.status(admin.status ? 200 : 409).json({
            status: admin.status,
            message: admin.message,
            data: admin.status ? admin.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function LoginAdminController(req, res) {
    try {
        const { email, password } = req.body;
        const loginSuccess = await LoginAdminService(email, password);

        return res.status(loginSuccess.status ? 200 : 404).json({
            status: loginSuccess.status,
            message: loginSuccess.message,
            token: loginSuccess.status ? loginSuccess.token : null,
            data: loginSuccess.status ? loginSuccess.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function MyProfileController(req, res) {
    try {
        const userID = req.userID;
        const adminData = await MyProfile(userID);

        return res.status(adminData.status ? 200 : 404).json({
            status: adminData.status,
            message: adminData.message,
            data: adminData.status ? adminData.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { RegisterAdminController, LoginAdminController, MyProfileController };