const AudioModel = require("../../models/audio.model");
const AudioCategoryModel = require("../../models/audioCategory.model");
const AudioSubCategoryModel = require("../../models/audioSubCategory.model");

async function GetAudioService(id, audioCategoryID, audioSubCategoryID, title) {
    try {
        // Constructing the dynamic query object
        let whereQuery = {};

        if (id) {
            whereQuery.id = id;
        }

        if (audioCategoryID) {
            whereQuery.audioCategoryID = audioCategoryID;
        }

        if (audioSubCategoryID) {
            whereQuery.audioSubCategoryID = audioSubCategoryID;
        }

        if (title) {
            whereQuery.title = title;
        }

        // Fetch the audio data based on the constructed query
        const audioData = await AudioModel.findAll({
            where: whereQuery, include: [{ model: AudioSubCategoryModel }, { model: AudioCategoryModel }]
        });

        // Check if no data was retrieved
        if (!audioData || audioData.length === 0) {
            return {
                status: false,
                message: "No audio found with the given criteria.",
            };
        }

        return {
            status: true,
            data: audioData,
        };
    } catch (error) {
        console.error("Error retrieving audios:", error);
        return {
            status: false,
            message: "Failed to retrieve audios. Please try again later.",
        };
    }
}

module.exports = GetAudioService;
