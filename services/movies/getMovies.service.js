const { Op } = require("sequelize");
const MoviesModel = require("../../models/movies.model");

async function GetMoviesService(id, title, status) {
    try {
        // Build the query dynamically
        const query = {};

        if (id) {
            query.id = id;
        }

        if (title) {
            query.title = { [Op.like]: `%${title}%` }; // Partial matching
        }

        if (status) {
            query.status = status;
        }

        // Fetch movies using Sequelize
        const movies = await MoviesModel.findAll({ where: query });

        if (movies.length === 0) {
            return {
                status: false,
                message: "No movies found matching the criteria.",
            };
        }

        return {
            status: true,
            message: "Movies retrieved successfully.",
            data: movies,
        };
    } catch (error) {
        console.error("Error in GetMoviesService:", error);
        return {
            status: false,
            message: "An error occurred while retrieving movies.",
        };
    }
};

module.exports = GetMoviesService;
