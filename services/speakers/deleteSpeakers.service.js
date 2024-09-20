const SpeakersModel = require('../../models/speakers.model');
const fs = require('fs').promises;

async function DeleteSpeakerService(id) {
    try {
        // Find the Speaker by ID
        const speakerToDelete = await SpeakersModel.findOne({ where: { id: id } });

        // If the language doesn't exist, return an error
        if (!speakerToDelete) {
            return {
                status: false,
                message: 'Speaker not found!'
            };
        }

        // If the language exists, delete it
        await speakerToDelete.destroy();

        return {
            status: true,
            message: 'Speaker deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteSpeakerService;
