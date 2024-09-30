const AudioCategoryModel = require("../../models/audioCategory.model");
const AudioSubCategoryModel = require("../../models/audioSubCategory.model");

async function GetAudioSubCategoryService(id, audioCategoryID, status) {
    try {
        let audioSubCategoryData;

        if (id) {
            audioSubCategoryData = await AudioSubCategoryModel.findOne({ where: { id: id }, include: { model: AudioCategoryModel } });
            if (!audioSubCategoryData) {
                return {
                    status: false,
                    message: `Audio category with ID ${id} not found`
                };
            }
        } else if (audioCategoryID) {
            audioSubCategoryData = await AudioSubCategoryModel.findAll({ where: { audioCategoryID: audioCategoryID }, include: { model: AudioCategoryModel } });
        } else if (status) {
            audioSubCategoryData = await AudioSubCategoryModel.findAll({ where: { status: status }, include: { model: AudioCategoryModel } });
        } else {
            audioSubCategoryData = await AudioSubCategoryModel.findAll({ include: { model: AudioCategoryModel } });
        }

        return {
            status: true,
            count: audioSubCategoryData.length,
            data: audioSubCategoryData
        };
    } catch (error) {
        console.error("Error retrieving Category:", error);
        return {
            status: false,
            message: "Failed to retrieve Audio Sub-Category. Please try again later."
        };
    }
}

module.exports = GetAudioSubCategoryService;
