const LikeModel = require("../../models/like.model");

async function LikeByUsers(userID, contentID) {
    try {
        const isLikedEarlier = await LikeModel.findOne({ where: { userID: userID, contentID: contentID } });

        if(!isLikedEarlier) {
            await LikeModel.create({ userID: userID, contentID: contentID });
        } else {
            await isLikedEarlier.destroy();
        }
        
        return {
            status: true,
            message: 'Like Operation was done successfully.'
        }
    } catch (error) {
        console.error("Error occurred while processing like:", error);
        return {
            status: false,
            message: 'An error occurred while processing the like operation.'
        };
    }
}


module.exports = LikeByUsers;