const ReelAdminModel = require("../../models/reel-admin.model");


async function UploadReelsAdmin(title, thumbNail, video, status, rating) {
    try {
        const reels = await ReelAdminModel.create({ title, thumbNail, video, status, rating });

        return {
            status: true,
            message: "Reels has been added successfully.",
            data: reels
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = UploadReelsAdmin;