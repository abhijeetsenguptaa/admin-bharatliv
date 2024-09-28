const AudioCategoryModel = require("../../models/audioCategory.model");

async function GetAudioCategoryService(id, status) {
    try {
        let audioCategoryData;

        if (id) {
            audioCategoryData = await AudioCategoryModel.findOne({ where: { id: id } });
            if (!audioCategoryData) {
                return {
                    status: false,
                    message: `Audio category with ID ${id} not found`
                };
            }
        } else if (status) {
            audioCategoryData = await AudioCategoryModel.findOne({ where: { status: status } });
        } else {
            audioCategoryData = await AudioCategoryModel.findAll();
        }

        return {
            status: true,
            count: audioCategoryData.length,
            data: audioCategoryData
        };
    } catch (error) {
        console.error("Error retrieving Category:", error);
        return {
            status: false,
            message: "Failed to retrieve Audio Category. Please try again later."
        };
    }
}

module.exports = GetAudioCategoryService;
