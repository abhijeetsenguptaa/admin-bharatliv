const OrganizationModel = require("../../models/organization.model");

async function FetchOrganizationService(id, status) {
    try {
        let organizationData;

        if (id) {
            organizationData = await OrganizationModel.findOne({ where: { id: id } });
            if (!organizationData) {
                return {
                    status: false,
                    message: `category with ID ${id} not found`
                };
            }
        } else if (status) {
            organizationData = await OrganizationModel.findAll({ where: { status: status } });
        } else {
            organizationData = await OrganizationModel.findAll();
        }

        return {
            status: true,
            count: organizationData.length,
            data: organizationData
        };
    } catch (error) {
        console.error("Error retrieving Category:", error);
        return {
            status: false,
            message: "Failed to retrieve Category. Please try again later."
        };
    }
}

module.exports = FetchOrganizationService;
