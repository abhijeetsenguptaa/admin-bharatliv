const LanguageModel = require("../../models/language.model");

async function StatusChangeService(id) {
    try {
        // Find the Language by its primary key (id)
        const data = await LanguageModel.findByPk(id);

        // Check if the Language exists
        if (!data) {
            return {
                status: false,
                message: 'Language not found!'
            };
        }

        // Toggle the status (true -> false or false -> true)
        data.status = !data.status;

        // Save the updated Language data
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
