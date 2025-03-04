const KathaModel = require("../../models/katha.model");

async function PostKathaService(title, thumbNail, video, status, speakerID) {
    try {
        await KathaModel.create({ title, thumbNail, video, status, speakerID });

        return {
            status: true,
            message: "Katha created successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: "Error occurred while creating movie"
        }
    }
};

module.exports = PostKathaService;