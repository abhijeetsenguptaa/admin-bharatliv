const AudioCategoryModel = require("../../models/audioCategory.model");
const AudioSubCategoryModel = require("../../models/audioSubCategory.model");

async function GetAudioSubCategoryService(id, audioCategoryID, status, device) {
    try {
        const whereConditions = {};

        // Dynamically add conditions
        if (id) whereConditions.id = id;
        if (audioCategoryID) whereConditions.audioCategoryID = audioCategoryID;
        if (status) whereConditions.status = status;
        if (device) whereConditions.device = device;

        // Query the database with dynamic conditions
        const audioSubCategoryData = await AudioSubCategoryModel.findAll({
            where: whereConditions,
            include: { model: AudioCategoryModel },
        });

        // Handle no data found
        if (audioSubCategoryData.length === 0) {
            return {
                status: false,
                message: "No Audio Sub-Category found matching the criteria.",
            };
        }

        return {
            status: true,
            count: audioSubCategoryData.length,
            data: audioSubCategoryData,
        };
    } catch (error) {
        console.error("Error retrieving Category:", error);
        return {
            status: false,
            message: "Failed to retrieve Audio Sub-Category. Please try again later.",
        };
    }
}

module.exports = GetAudioSubCategoryService;
