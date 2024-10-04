const OrganizationModel = require("../../models/organization.model");
const SeriesModel = require("../../models/series.model");
const SpeakersModel = require("../../models/speakers.model");

async function GetSeriesService(id, speakerID, organizationID, status) {
    try {
        let whereClause = {};

        // Filtering by id if provided
        if (id) {
            const SeriesData = await SeriesModel.findOne({ where: { id: id } });
            if (!SeriesData) {
                return {
                    status: false,
                    message: `Series with ID ${id} not found`,
                };
            }
            return {
                status: true,
                count: 1, // Since findOne returns a single record
                data: SeriesData,
            };
        }

        // Additional filtering by speakerID, organizationID, and status if provided
        if (speakerID) {
            whereClause.speakerID = speakerID;
        }

        if (organizationID) {
            whereClause.organizationID = organizationID;
        }

        if (status) {
            whereClause.status = status;
        }

        // Fetch all data based on the filters (if any)
        const SeriesData = await SeriesModel.findAll({
            where: whereClause,
            include: [{ model: OrganizationModel }, { model: SpeakersModel }]
        });

        return {
            status: true,
            count: SeriesData.length,
            data: SeriesData,
        };
    } catch (error) {
        console.error("Error retrieving Series:", error);
        return {
            status: false,
            message: "Failed to retrieve Series. Please try again later.",
        };
    }
}

module.exports = GetSeriesService;
