const OrganizationModel = require("../../models/organization.model");
const SpeakersModel = require("../../models/speakers.model");

async function FetchSpeakerService(id, organizationID, status) {
    try {
        let speakerData;

        if (id) {
            speakerData = await SpeakersModel.findOne({ where: { id: id }, include: { model: OrganizationModel } });
            if (!speakerData) {
                return {
                    status: false,
                    message: `Speaker with ID ${id} not found`
                };
            }
        } else if (status) {
            speakerData = await SpeakersModel.findOne({ where: { status: status }, include: { model: OrganizationModel } });
        } else if (organizationID) {
            speakerData = await SpeakersModel.findAll({ where: { organizationID: organizationID }, include: { model: OrganizationModel } });
        } else {
            speakerData = await SpeakersModel.findAll({ include: { model: OrganizationModel } });
        }

        return {
            status: true,
            count: speakerData.length,
            data: speakerData
        };
    } catch (error) {
        console.error("Error retrieving Speaker:", error);
        return {
            status: false,
            message: "Failed to retrieve Speaker. Please try again later."
        };
    }
}

module.exports = FetchSpeakerService;
