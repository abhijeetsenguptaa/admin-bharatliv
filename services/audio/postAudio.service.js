const AudioModel = require("../../models/audio.model");

async function PostAudioService(audioCategoryID, audioSubCategoryID, title, thumbNail, audio, status) {
    try {
        const newAudio = await AudioModel.create({ audioCategoryID, audioSubCategoryID, title, thumbNail, audio, status });

        return {
            status: true,
            message: "Audio has been successfully created!",
            data: newAudio
        }
    } catch (error) {
        console.error("Error retrieving Category:", error);
        return {
            status: false,
            message: "Failed to post Audio. Please try again later."
        };
    }
}

module.exports = PostAudioService;