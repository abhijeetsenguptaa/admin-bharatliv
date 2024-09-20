const CommentModel = require("../../models/comment.model");


async function CommentsByUsers(userID, contentID, text) {
    try {
        const commentsAdded = await CommentModel.create({ userID, contentID, text });
        
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


module.exports = CommentsByUsers;