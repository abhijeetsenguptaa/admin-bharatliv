const SpeakersModel = require("../../models/speakers.model");

async function EditSpeakerService(id, organizationID, title, status, image) {
    try {
        // Find the speaker by its primary key (id)
        const speaker = await SpeakersModel.findByPk(id);

        // If the speaker is not found, return an error message
        if (!speaker) {
            return { status: false, message: 'Speaker not found' };
        }

        // Conditionally update each field if the value is provided (i.e., not undefined or null)
        if (organizationID !== undefined && organizationID !== null) {
            speaker.organizationID = organizationID;
        }

        if (title !== undefined && title !== null) {
            speaker.title = title;
        }

        if (status !== undefined && status !== null) {
            speaker.status = status;
        }

        if (image !== undefined && image !== null) {
            speaker.image = image;
        }

        // Save the updated speaker information to the database
        await speaker.save();

        // Return a success message after updating the speaker
        return { status: true, message: 'Speaker updated successfully', speaker };

    } catch (error) {
        // Handle any errors that occur during the update process
        console.error("Error updating speaker:", error);
        return { status: false, message: 'An error occurred while updating the speaker' };
    }
}

module.exports = EditSpeakerService;
