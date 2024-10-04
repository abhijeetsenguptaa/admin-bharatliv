const SeriesModel = require('../../models/series.model');
const fs = require('fs').promises;

async function DeleteSeriesService(id) {
    try {
        // Find the Series by ID
        const SeriesToDelete = await SeriesModel.findOne({ where: { id: id } });

        // If the Series doesn't exist, return an error
        if (!SeriesToDelete) {
            return {
                status: false,
                message: 'Series not found!'
            };
        }

        // If the Series exists, delete it
        await SeriesToDelete.destroy();

        return {
            status: true,
            message: 'Series deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteSeriesService;
