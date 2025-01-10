const ReelAdminLikeModel = require("../../models/reel-like.model");

async function PostLikesReelsAdmin(userID, reelsAdminID) {
    try {
        const isLikedEarlier = await ReelAdminLikeModel.findOne({ where: { userID: userID, adminReelID: reelsAdminID } });

        if (!isLikedEarlier) {
            await ReelAdminLikeModel.create({ userID: userID, adminReelID: reelsAdminID });
        } else {
            await isLikedEarlier.destroy();
        }

        return {
            status: true,
            message: 'Like on Reels Operation was done successfully.'
        }
    } catch (error) {
        console.error("Error occurred while processing like:", error);
        return {
            status: false,
            message: 'An error occurred while processing the like operation.'
        };
    }
};

module.exports = PostLikesReelsAdmin;