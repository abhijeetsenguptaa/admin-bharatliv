const UrlModel = require("../../models/url.model");

async function UploadUrlService(title,
    description,
    url) {
    try {

        // Check if the organization with the given title already exists
        const isURL = await UrlModel.findOne({ where: { url: url.trim() } });

        if (isURL) {
            return {
                status: false,
                message: "An URL with this title already exists."
            };
        }

        // Create the new organization entry
        const speakerCreate = await UrlModel.create({
            title,
            description,
            url
        });

        // Return success response with the created data
        return {
            status: true,
            message: "URL has been added successfully.",
            data: speakerCreate
        };

    } catch (error) {
        console.error("Error in UploadUrl:", error);

        // Return failure response with a more detailed error message
        return {
            status: false,
            message: "An error occurred while adding the url.",
            error: error.message // You might want to mask this in production
        };
    }
}

module.exports = UploadUrlService;
