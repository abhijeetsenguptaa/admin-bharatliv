const SpeakersModel = require("../../models/speakers.model");

async function PostSpeakerServices(organizationID, title, image) {
    try {

        // Check if the organization with the given title already exists
        const isSpeaker = await SpeakersModel.findOne({ where: { title: title.trim() } });

        if (isSpeaker) {
            return {
                status: false,
                message: "An speakers with this title already exists."
            };
        }

        // Create the new organization entry
        const speakerCreate = await SpeakersModel.create({
            organizationID, title, image
        });

        // Return success response with the created data
        return {
            status: true,
            message: "Speaker has been added successfully.",
            data: speakerCreate
        };

    } catch (error) {
        console.error("Error in PostSpeakerServices:", error);

        // Return failure response with a more detailed error message
        return {
            status: false,
            message: "An error occurred while adding the speaker.",
            error: error.message // You might want to mask this in production
        };
    }
}

module.exports = PostSpeakerServices;
