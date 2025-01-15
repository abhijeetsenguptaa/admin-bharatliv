const ReelAdminModel = require('../../models/reel-admin.model');
const fs = require('fs').promises;

async function DeleteReelAdminService(id) {
    try {
        // Find the Category by ID
        const reelsToDelete = await ReelAdminModel.findOne({ where: { id: id } });

        // If the Category doesn't exist, return an error
        if (!reelsToDelete) {
            return {
                status: false,
                message: 'Reels not found!'
            };
        }

        // If the Category exists, delete it
        await reelsToDelete.destroy();

        return {
            status: true,
            message: 'Reels deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteReelAdminService;
