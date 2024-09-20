const ContentModel = require('../../models/content.model');
const fs = require('fs').promises;

async function DeleteContentService(id) {
    try {
        // Find the Content by ID
        const contentToDelete = await ContentModel.findOne({ where: { id: id } });

        // If the Content doesn't exist, return an error
        if (!contentToDelete) {
            return {
                status: false,
                message: 'Content not found!'
            };
        }

        // If the Content exists, delete it
        await contentToDelete.destroy();

        return {
            status: true,
            message: 'Content deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteContentService;
