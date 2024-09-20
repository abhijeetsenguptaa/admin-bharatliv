const CommentModel = require("../../models/comment.model");

async function EditCommentsByUser(userID, commentID, text) {
    try {
        // Find the comment by both commentID and userID
        const comment = await CommentModel.findOne({ where: { id: commentID, userID: userID } });

        if (comment) {
            comment.text = text;
            await comment.save();

            return {
                status: true,
                message: "Comment Edited successfully."
            };
        } else {
            // If the comment doesn't exist or the user is not authorized, handle the error
            return {
                status: false,
                message: "Comment not found or you are not authorized to Edit this comment."
            };
        }
    } catch (error) {
        console.error("Error in EditCommentsByUser:", error);
        return {
            status: false,
            message: "An internal server error occurred while editing the comment."
        };
    }
}

module.exports = EditCommentsByUser;
