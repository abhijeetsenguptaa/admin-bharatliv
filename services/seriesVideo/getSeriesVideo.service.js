const SeriesModel = require("../../models/series.model");
const SeriesVideoModel = require("../../models/seriesVideo.model");


async function GetSeriesVideoService(id, seriesID, status) {
    try {
        let whereClause = {};

        // Filtering by id if provided
        if (id) {
            const SeriesVideoData = await SeriesVideoModel.findOne({ where: { id: id } });
            if (!SeriesVideoData) {
                return {
                    status: false,
                    message: `Series with ID ${id} not found`,
                };
            }
            return {
                status: true,
                count: 1, // Since findOne returns a single record
                data: SeriesVideoData,
            };
        }

        // Additional filtering by speakerID, organizationID, and status if provided
        if (seriesID) {
            whereClause.seriesID = seriesID;
        }


        if (status) {
            whereClause.status = status;
        }

        // Fetch all data based on the filters (if any)
        const SeriesVideoData = await SeriesVideoModel.findAll({
            where: whereClause,
            include: { model: SeriesModel }
        });

        return {
            status: true,
            count: SeriesVideoData.length,
            data: SeriesVideoData,
        };
    } catch (error) {
        console.error("Error retrieving Series:", error);
        return {
            status: false,
            message: "Failed to retrieve Series. Please try again later.",
        };
    }
}

module.exports = GetSeriesVideoService;
