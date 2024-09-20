const BannerModel = require('../../models/banner.model');
const fs = require('fs').promises;

async function DeleteBannerService(id) {
    try {
        // Find the Speaker by ID
        const BannerToDelete = await BannerModel.findOne({ where: { id: id } });

        // If the language doesn't exist, return an error
        if (!BannerToDelete) {
            return {
                status: false,
                message: 'Banner not found!'
            };
        }

        // If the language exists, delete it
        await BannerToDelete.destroy();

        return {
            status: true,
            message: 'Banner deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteBannerService;
