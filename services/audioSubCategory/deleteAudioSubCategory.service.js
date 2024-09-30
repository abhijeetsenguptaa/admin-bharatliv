const AudioSubCategoryModel = require('../../models/audioSubCategory.model');
const fs = require('fs').promises;

async function DeleteAudioSubCategoryService(id) {
    try {
        // Find the Category by ID
        const audioCategoryToDelete = await AudioSubCategoryModel.findOne({ where: { id: id } });

        // If the Category doesn't exist, return an error
        if (!audioCategoryToDelete) {
            return {
                status: false,
                message: 'Audio Sub-Category not found!'
            };
        }

        // If the Category exists, delete it
        await audioCategoryToDelete.destroy();

        return {
            status: true,
            message: 'Audio Sub-Category deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteAudioSubCategoryService;
