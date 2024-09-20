const CategoryModel = require("../../models/category.model");
const ContentModel = require("../../models/content.model");
const { Op } = require("sequelize");

async function ContentForManager(id, userID, status, hasApprovedByAdmin) {
    try {
        let whereClause = { userID: userID };

        // Construct the where clause based on the provided parameters
        if (id) {
            whereClause.id = id;
        }

        if (status) {
            whereClause.status = status;
        }

        if (hasApprovedByAdmin !== undefined) {
            whereClause.hasApprovedByAdmin = hasApprovedByAdmin;
        }

        // Fetch content based on the constructed where clause
        const contentData = await ContentModel.findAll({ where: whereClause, include: [{ model: CategoryModel }] });

        return {
            status: true,
            message: "Content data as per requested.",
            count: contentData.length,
            data: contentData
        };
    } catch (error) {
        console.error("Error in ContentForManager:", error.message);
        return {
            status: false,
            message: "An error occurred while fetching content for manager"
        };
    }
}

module.exports = ContentForManager;
