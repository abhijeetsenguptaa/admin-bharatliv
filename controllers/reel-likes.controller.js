const PostLikesReelsAdmin = require("../services/reelsLike/postLikes.service");

async function ReelsAdminLikesController(req, res) {
    try {
        const userID = req.userID;
        const reelsAdminID = req.params.reelsAdminID;

        const likeGeneration = await PostLikesReelsAdmin(userID, reelsAdminID);

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
};

module.exports = ReelsAdminLikesController;