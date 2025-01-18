const MoviesModel = require("../../models/movies.model");

async function PostMoviesService(title, thumbNail, video, status, rating) {
    try {
        await MoviesModel.create({ title, thumbNail, video, status, rating });

        return {
            status: true,
            message: "Movie created successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: "Error occurred while creating movie"
        }
    }
};

module.exports = PostMoviesService;