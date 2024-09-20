const OrganizationModel = require("../../models/organization.model");

async function PostOrganizationServices(title, image) {
    try {

        // Check if the organization with the given title already exists
        const isOrganization = await OrganizationModel.findOne({ where: { title: title } });

        if (isOrganization) {
            return {
                status: false,
                message: "An organization with this title already exists."
            };
        }

        // Create the new organization entry
        const organizationCreate = await OrganizationModel.create({
            title, image
        });

        // Return success response with the created data
        return {
            status: true,
            message: "Organization has been added successfully.",
            data: organizationCreate
        };

    } catch (error) {
        console.error("Error in PostOrganizationServices:", error);

        // Return failure response with a more detailed error message
        return {
            status: false,
            message: "An error occurred while adding the organization.",
            error: error.message // You might want to mask this in production
        };
    }
}

module.exports = PostOrganizationServices;
