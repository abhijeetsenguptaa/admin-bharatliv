const UsersModel = require("../../models/users.model");

async function EditMyProfile(userID, name, email, password, phoneNumber, gender, image, bio) {
    try {
        // Find the user by ID
        const user = await UsersModel.findOne({ where: { id: userID } });

        if (!user) {
            return {
                status: false,
                message: "User not found!"
            };
        }

        // Prepare an object with fields to update
        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (email) updatedFields.email = email;
        if (password) updatedFields.password = password;
        if (phoneNumber) updatedFields.phoneNumber = phoneNumber;
        if (gender) updatedFields.gender = gender;
        if (image) updatedFields.image = image;
        if (bio) updatedFields.bio = bio;

        // Update user with the prepared fields
        await user.update(updatedFields);
        console.log(updatedFields);

        return {
            status: true,
            message: "User profile updated successfully!",
            data: user // Optionally, return the updated user data
        };
    } catch (error) {
        console.error("Error in EditMyProfile:", error.message);
        return {
            status: false,
            message: "An error occurred while editing user profile. Please try again later."
        };
    }
}

module.exports = EditMyProfile;
