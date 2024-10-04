const SeriesModel = require("../../models/series.model");


async function PostSeriesServices(title, image, status, speakerID, organizationID, languageID) {
    try {
        const Series = await SeriesModel.create({ title, image, status, speakerID, organizationID, languageID });

        return {
            status: true,
            message: "Series has been added successfully.",
            data: Series
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports = PostSeriesServices;