const OrganizationModel = require("../../models/organization.model");

async function StatusChangeService(id) {
    try {
        // Find the organization by its primary key (id)
        const data = await OrganizationModel.findByPk(id);

        // Check if the organization exists
        if (!data) {
            return {
                status: false,
                message: 'Organization not found!'
            };
        }

        // Toggle the status (true -> false or false -> true)
        data.status = !data.status;

        // Save the updated organization data
        await data.save();

        return {
            status: true,
            message: 'Status changed successfully!'
        };
    } catch (error) {
        // Return error response in case of exception
        return {
            status: false,
            message: `Error changing status: ${error.message}`
        };
    }
}

module.exports = StatusChangeService;
