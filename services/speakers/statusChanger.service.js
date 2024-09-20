const SpeakersModel = require("../../models/speakers.model");

async function StatusChangeService(id) {
    try {
        // Find the Speaker by its primary key (id)
        const data = await SpeakersModel.findByPk(id);

        // Check if the Speaker exists
        if (!data) {
            return {
                status: false,
                message: 'Speaker not found!'
            };
        }

        // Toggle the status (true -> false or false -> true)
        data.status = !data.status;

        // Save the updated Speaker data
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
