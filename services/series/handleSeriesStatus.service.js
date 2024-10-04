const SeriesModel = require("../../models/series.model");

async function HandleSeriesStatusService(id) {
    try {
        const fetchSeries = await SeriesModel.findOne({ where: { id: id } });

        if (!fetchSeries) {
            return {
                status: false,
                message: 'Series not found!'
            };
        }

        fetchSeries.status = !fetchSeries.status;

        await fetchSeries.save();

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

module.exports = HandleSeriesStatusService;