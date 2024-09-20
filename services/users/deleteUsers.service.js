const UsersModel = require("../../models/users.model");


async function DeleteUsersService(id) {
    try {
        // Find the User by ID
        const UserToDelete = await UsersModel.findOne({ where: { id: id } });

        // If the User doesn't exist, return an error
        if (!UserToDelete) {
            return {
                status: false,
                message: 'User not found!'
            };
        }

        // If the User exists, delete it
        await UserToDelete.destroy();

        return {
            status: true,
            message: 'User deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteUsersService;
