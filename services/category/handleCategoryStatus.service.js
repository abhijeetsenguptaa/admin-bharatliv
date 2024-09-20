const CategoryModel = require("../../models/category.model");

async function HandleCategoryStatusService(id) {
    try {
        const fetchCategory = await CategoryModel.findOne({ where: { id: id } });

        if (!fetchCategory) {
            return {
                status: false,
                message: 'Category not found!'
            };
        }

        fetchCategory.status = !fetchCategory.status;

        await fetchCategory.save();

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

module.exports = HandleCategoryStatusService;