const { Op } = require("sequelize");
const UsersModel = require("../../models/users.model");
const ReelModel = require("../../models/reels.model");

async function FetchReelService(id, userID, title, status, hasApprovedByAdmin) {
    try {
        let whereClause = {};

        if (id) {
            whereClause.id = id;
        }

        if (userID) {
            whereClause.userID = userID;
        }

        if (hasApprovedByAdmin) {
            whereClause.hasApprovedByAdmin = hasApprovedByAdmin;
        }

        if (status) {
            whereClause.status = status;
        }

        if (title) {
            whereClause.title = {
                [Op.like]: `%${title}%` // Using Op.like to perform a case-insensitive search
            };
        }

        const reelsData = await ReelModel.findAll({
            where: whereClause,
            include: [{ model: UsersModel }]
        });

        return {
            status: true,
            count: reelsData.length,
            data: reelsData
        };
    } catch (error) {
        console.error("Error retrieving Reels:", error);
        return {
            status: false,
            message: "Failed to retrieve Reels. Please try again later."
        };
    }
}



module.exports = FetchReelService;
