const CategoryModel = require('../../models/category.model');
const fs = require('fs').promises;

async function DeleteCategoryService(id) {
    try {
        // Find the Category by ID
        const categoryToDelete = await CategoryModel.findOne({ where: { id: id } });

        // If the Category doesn't exist, return an error
        if (!categoryToDelete) {
            return {
                status: false,
                message: 'Category not found!'
            };
        }

        // If the Category exists, delete it
        await categoryToDelete.destroy();

        return {
            status: true,
            message: 'Category deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteCategoryService;
