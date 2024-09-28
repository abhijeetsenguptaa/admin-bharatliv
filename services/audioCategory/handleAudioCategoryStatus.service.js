const AudioCategoryModel = require("../../models/audioCategory.model");

async function HandleAudioCategoryStatusService(id) {
    try {
        const fetchAudioCategory = await AudioCategoryModel.findOne({ where: { id: id } });

        if (!fetchAudioCategory) {
            return {
                status: false,
                message: 'Category not found!'
            };
        }

        fetchAudioCategory.status = !fetchAudioCategory.status;

        await fetchAudioCategory.save();

        return {
            status: true,
            message: "Status updated successfully."
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = HandleAudioCategoryStatusService;