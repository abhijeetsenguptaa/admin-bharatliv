const AdminModel = require("../../models/admin.model");

async function MyProfile(userID) {
    try {
        // Fetch user profile from the database
        const data = await AdminModel.findOne({ where: { id: userID } });

        // Check if data was found
        if (!data) {
            // Handle the case when no data is found
            return {
                status: false,
                message: 'User not found'
            };
        }

        // Return the user profile data
        return {
            status: true,
            data: data
        };
    } catch (error) {
        // Log the error and return an error message
        console.error('Error fetching user profile:', error);
        return {
            status: false, 
            message: 'An error occurred while fetching user profile'
        };
    }
}

module.exports = MyProfile;
