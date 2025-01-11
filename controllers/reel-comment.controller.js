const PostCommentsReelsAdminService = require("../services/reelsComment/postComments.service");

async function ReelsAdminCommentController(req, res) {
    try {
        const userID = req.userID;
        const adminReelID = req.params.adminReelID;
        const text = req.body.text;

        const commentGeneration = await PostCommentsReelsAdminService(userID, adminReelID, text);

        return res.status(commentGeneration.status ? 200 : 404).json({
            status: commentGeneration.status,
            message: commentGeneration.message,
            data: commentGeneration.data
        });
    } catch (error) {
        console.error("Error in CommentUserController:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred while processing the comment operation."
        });
    }
};

module.exports = { ReelsAdminCommentController }