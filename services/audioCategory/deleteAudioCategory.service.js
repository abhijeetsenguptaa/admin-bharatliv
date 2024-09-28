const AudioCategoryModel = require('../../models/audioCategory.model');
const fs = require('fs').promises;

async function DeleteAudioCategoryService(id) {
    try {
        // Find the Category by ID
        const audioCategoryToDelete = await AudioCategoryModel.findOne({ where: { id: id } });

        // If the Category doesn't exist, return an error
        if (!audioCategoryToDelete) {
            return {
                status: false,
                message: 'Audio Category not found!'
            };
        }

        // If the Category exists, delete it
        await audioCategoryToDelete.destroy();

        return {
            status: true,
            message: 'Audio Category deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteAudioCategoryService;
