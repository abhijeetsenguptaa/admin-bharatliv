const SeriesVideoModel = require('../../models/seriesVideo.model');
const fs = require('fs').promises;

async function DeleteSeriesVideoService(id) {
    try {
        // Find the Series Video by ID
        const videoToDelete = await SeriesVideoModel.findOne({ where: { id: id } });

        // If the Content doesn't exist, return an error
        if (!videoToDelete) {
            return {
                status: false,
                message: 'Series Video not found!'
            };
        }

        // If the Content exists, delete it
        await videoToDelete.destroy();

        return {
            status: true,
            message: 'Series Video deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteSeriesVideoService;
