const MoviesModel = require("../../models/movies.model");

async function HandleMoviesStatusService(id) {
    try {
        const fetchMovies = await MoviesModel.findOne({ where: { id: id } });

        if (!fetchMovies) {
            return {
                status: false,
                message: 'Content not found!'
            };
        }

        fetchMovies.status = !fetchMovies.status;

        await fetchMovies.save();

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

module.exports = HandleMoviesStatusService;