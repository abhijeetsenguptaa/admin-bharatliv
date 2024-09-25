const ReelModel = require('../../models/reels.model');
const fs = require('fs').promises;

async function DeleteReelService(id) {
    try {
        // Find the Reel by ID
        const ReelToDelete = await ReelModel.findOne({ where: { id: id } });

        // If the Reel doesn't exist, return an error
        if (!ReelToDelete) {
            return {
                status: false,
                message: 'Reel not found!'
            };
        }

        // If the Reel exists, delete it
        await ReelToDelete.destroy();

        return {
            status: true,
            message: 'Reel deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteReelService;
