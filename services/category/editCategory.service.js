const CategoryModel = require("../../models/category.model");
const fs = require('fs').promises; // Import the 'fs' module for file system operations

async function EditCategoryService(id, title, status) {
    try {
        const fetchCategory = await CategoryModel.findOne({ where: { id: id } });

        if (!fetchCategory) {
            return {
                status: false,
                message: 'Category not found!'
            };
        }

        // Update Category properties
        fetchCategory.title = title;
        fetchCategory.status = status;

        // Save changes to the Category
        await fetchCategory.save();

        return {
            status: true,
            message: 'Category updated successfully'
        };

    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = EditCategoryService;