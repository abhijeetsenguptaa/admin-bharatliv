const CategoryModel = require("../../models/category.model");
const ContentModel = require("../../models/content.model");
const UsersModel = require("../../models/users.model");

async function GetContentSuperAdminService(id, status, categoryID, userID, hasApprovedByAdmin) {
    try {
        let contentData;

        if (id) {
            contentData = await ContentModel.findOne({ where: { id: id }, include: [{ model: UsersModel }, { model: CategoryModel }] });
            if (!contentData) {
                return {
                    status: false,
                    message: `content with ID ${id} not found`
                };
            }
        } else if (status) {
            contentData = await ContentModel.findOne({ where: { status: status }, include: [{ model: UsersModel }, { model: CategoryModel }] });
        } else if (categoryID) {
            contentData = await ContentModel.findAll({ where: { categoryID: categoryID }, include: [{ model: UsersModel }, { model: CategoryModel }] });
        } else if (userID) {
            contentData = await ContentModel.findAll({ where: { userID: userID }, include: [{ model: UsersModel }, { model: CategoryModel }] });
        } else if (hasApprovedByAdmin) {
            contentData = await ContentModel.findAll({ where: { hasApprovedByAdmin: hasApprovedByAdmin }, include: [{ model: UsersModel }, { model: CategoryModel }] });
        } else {
            contentData = await ContentModel.findAll({ include: [{ model: UsersModel }, { model: CategoryModel }] });
        }

        return {
            status: true,
            count: contentData.length,
            data: contentData
        };
    } catch (error) {
        console.error("Error retrieving Content:", error);
        return {
            status: false,
            message: "Failed to retrieve Content. Please try again later."
        };
    }
}

module.exports = GetContentSuperAdminService;
