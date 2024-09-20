const CommentModel = require("../../models/comment.model");

async function DeleteCommentsByUser(commentID) {
    try {
        // Find the comment by both commentID and userID
        const comment = await CommentModel.findOne({ where: { id: commentID } });

        if (comment) {
            // If the comment exists, delete it
            await comment.destroy();
            return {
                status: true,
                message: "Comment deleted successfully."
            };
        } else {
            // If the comment doesn't exist or the user is not authorized, handle the error
            return {
                status: false,
                message: "Comment not found or you are not authorized to delete this comment."
            };
        }
    } catch (error) {
        console.error("Error in DeleteCommentsByUser:", error);
        return {
            status: false,
            message: "An internal server error occurred while deleting the comment."
        };
    }
}

module.exports = DeleteCommentsByUser;
