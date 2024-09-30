const CategoryModel = require("../../models/category.model");

async function GetCategoryService(id, status) {
    try {
        let categoryData;

        if (id) {
            categoryData = await CategoryModel.findOne({ where: { id: id } });
            if (!categoryData) {
                return {
                    status: false,
                    message: `category with ID ${id} not found`
                };
            }
        } else if (status) {
            categoryData = await CategoryModel.findAll({ where: { status: status } });
        } else {
            categoryData = await CategoryModel.findAll();
        }

        return {
            status: true,
            count: categoryData.length,
            data: categoryData
        };
    } catch (error) {
        console.error("Error retrieving Category:", error);
        return {
            status: false,
            message: "Failed to retrieve Category. Please try again later."
        };
    }
}

module.exports = GetCategoryService;
