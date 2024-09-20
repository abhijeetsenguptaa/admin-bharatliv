const CommentsByUsers = require("../services/user-interaction/CommentsByUsers.service");
const DeleteCommentsByUser = require("../services/user-interaction/DeleteComments.service");
const EditCommentsByUser = require("../services/user-interaction/EditComments.service");
const LikeByUsers = require("../services/user-interaction/LikeByUsers.service");

async function LikeUserController(req, res) {
    try {
        const userID = req.userID;
        const contentID = req.params.contentID;

        const likeGeneration = await LikeByUsers(userID, contentID);

        return res.status(likeGeneration.status ? 200 : 404).json({
            status: likeGeneration.status,
            message: likeGeneration.message
        });
    } catch (error) {
        console.error("Error in LikeUserController:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred while processing the like operation."
        });
    }
}

async function CommentUserController(req, res) {
    try {
        const userID = req.userID;
        const contentID = req.params.contentID;
        const text = req.body.text;

        const commentGeneration = await CommentsByUsers(userID, contentID, text);

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
}

async function EditCommentUserController(req, res) {
    try {
        const userID = req.userID;
        const commentID = req.params.commentID;
        const text = req.body.text;

        const commentGeneration = await EditCommentsByUser(userID, commentID, text);

        return res.status(commentGeneration.status ? 200 : 404).json({
            status: commentGeneration.status,
            message: commentGeneration.message
        });
    } catch (error) {
        console.error("Error in CommentUserController:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred while processing the comment operation."
        });
    }
}

async function DeleteCommentUserController(req, res) {
    try {
        const commentID = req.params.commentID;

        const commentDelete = await DeleteCommentsByUser(commentID);

        return res.status(commentDelete.status ? 200 : 404).json({
            status: commentDelete.status,
            message: commentDelete.message
        });
    } catch (error) {
        console.error("Error in CommentUserController:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred while processing the comment operation."
        });
    }
}



module.exports = { LikeUserController, CommentUserController, EditCommentUserController, DeleteCommentUserController };
