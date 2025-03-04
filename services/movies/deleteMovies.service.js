const MoviesModel = require('../../models/movies.model');
const fs = require('fs').promises;

async function DeleteMoviesService(id) {
    try {
        // Find the Content by ID
        const movieToDelete = await MoviesModel.findOne({ where: { id: id } });

        // If the Content doesn't exist, return an error
        if (!movieToDelete) {
            return {
                status: false,
                message: 'Movies not found!'
            };
        }

        // If the Content exists, delete it
        await movieToDelete.destroy();

        return {
            status: true,
            message: 'Movies deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteMoviesService;
