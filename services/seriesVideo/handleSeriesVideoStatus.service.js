const SeriesVideoModel = require("../../models/seriesVideo.model");

async function HandleSeriesVideoStatusService(id) {
    try {
        const fetchContent = await SeriesVideoModel.findOne({ where: { id: id } });

        if (!fetchContent) {
            return {
                status: false,
                message: 'Series Video not found!'
            };
        }

        fetchContent.status = !fetchContent.status;

        await fetchContent.save();

        return {
            status: true,
            message: "Status updated successfully."
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = HandleSeriesVideoStatusService;