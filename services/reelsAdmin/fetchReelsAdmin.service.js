const { Op } = require("sequelize");
const ReelAdminModel = require("../../models/reel-admin.model");
const ReelAdminLikeModel = require("../../models/reel-like.model");
const ReelAdminCommentModel = require("../../models/reel-comment.model");
async function GetReelsAdminService(
    id,
    status,
    title
) {
    try {
        let whereClause = {};

        if (id) {
            whereClause.id = id;
        }

        if (status) {
            whereClause.status = status;
        }

        if (title) {
            whereClause.title = {
                [Op.like]: `%${title}%`, // Using Op.like to perform a case-insensitive search
            };
        }


        const reelsData = await ReelAdminModel.findAll({
            where: whereClause,
            include: [ReelAdminLikeModel, ReelAdminCommentModel]
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
            message: "Failed to retrieve Reels. Please try again later.",
        };
    }
}



module.exports = GetReelsAdminService;
