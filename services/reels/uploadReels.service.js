const ReelModel = require("../../models/reels.model");


async function UploadReelServices(userID, title, thumbNail, video, status, hasApprovedByAdmin) {
    try {
        const reel = await ReelModel.create({
            userID,
            title,
            thumbNail,
            video,
            status,
            hasApprovedByAdmin
        });

        return {
            status: true,
            message: "Reel has been added successfully.Waiting for the Admins Approval.",
            data: reel
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports = UploadReelServices;