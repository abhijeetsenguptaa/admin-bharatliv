const ReelAdminCommentModel = require("../../models/reel-comment.model");


async function PostCommentsReelsAdminService(userID, adminReelID, text) {
    try {
        const commentsAdded = await ReelAdminCommentModel.create({ userID, adminReelID, text });
        
        return {
            status: true,
            message: 'Comments Operation was done successfully.',
            data: commentsAdded
        }
    } catch (error) {
        console.error("Error occurred while processing Comments:", error);
        return {
            status: false,
            message: 'An error occurred while processing the Comments operation.'
        };
    }
}


module.exports = PostCommentsReelsAdminService;