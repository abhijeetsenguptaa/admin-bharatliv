const BannerModel = require("../../models/banner.model");

async function StatusChangeService(id) {
    try {
        // Find the Banner by its primary key (id)
        const data = await BannerModel.findByPk(id);

        // Check if the Banner exists
        if (!data) {
            return {
                status: false,
                message: 'Banner not found!'
            };
        }

        // Toggle the status (true -> false or false -> true)
        data.status = !data.status;

        // Save the updated Banner data
        await data.save();

        return {
            status: true,
            message: 'Status changed successfully!'
        };
    } catch (error) {
        // Return error response in case of exception
        return {
            status: false,
            message: `Error changing status: ${error.message}`
        };
    }
}

module.exports = StatusChangeService;
