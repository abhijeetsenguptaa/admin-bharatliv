const CategoryModel = require("../../models/category.model");


async function PostCategoryServices(title, status) {
    try {
        const category = await CategoryModel.create({ title, status });

        return {
            status: true,
            message: "Category has been added successfully.",
            data: category
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports = PostCategoryServices;