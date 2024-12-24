const BannerModel = require("../../models/banner.model");

async function PostBannerServices(title, image, type, url) {
    try {
        // Check if the Banner with the given title already exists
        const isBanner = await BannerModel.findOne({ where: { title: title } });

        if (isBanner) {
            return {
                status: false,
                message: "An Banner with this title already exists."
            };
        }

        // Create the new Banner entry
        const BannerCreate = await BannerModel.create({
            title, image, type, url
        });

        // Return success response with the created data
        return {
            status: true,
            message: "Banner has been added successfully.",
            data: BannerCreate
        };

    } catch (error) {
        console.error("Error in PostBannerServices:", error);
        // Return failure response with a more detailed error message
        return {
            status: false,
            message: "An error occurred while adding the Banner.",
            error: error.message // You might want to mask this in production
        };
    }
}

module.exports = PostBannerServices;
