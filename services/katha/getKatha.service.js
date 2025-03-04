const { Op } = require("sequelize");
const KathaModel = require("../../models/katha.model");
const SpeakersModel = require("../../models/speakers.model");

async function GetKathaService(id, title, status, speakerID) {
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

        if (speakerID) {
            query.speakerID = speakerID;
        }

        // Fetch kathas using Sequelize with proper include syntax
        const kathas = await KathaModel.findAll({
            where: query,
            include : SpeakersModel
        });

        if (kathas.length === 0) {
            return {
                status: false,
                message: "No katha found matching the criteria.",
            };
        }

        return {
            status: true,
            message: "Katha retrieved successfully.",
            data: kathas,
        };
    } catch (error) {
        console.error("Error in GetKathaService:", error);
        return {
            status: false,
            message: "An error occurred while retrieving kathas.",
        };
    }
}

module.exports = GetKathaService;
