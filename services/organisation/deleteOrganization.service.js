const OrganizationModel = require('../../models/organization.model');
const fs = require('fs').promises;

async function DeleteOrganizationService(id) {
    try {
        // Find the Speaker by ID
        const organizationToDelete = await OrganizationModel.findOne({ where: { id: id } });

        // If the language doesn't exist, return an error
        if (!organizationToDelete) {
            return {
                status: false,
                message: 'Organization not found!'
            };
        }

        // If the language exists, delete it
        await organizationToDelete.destroy();

        return {
            status: true,
            message: 'Organization deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteOrganizationService;
