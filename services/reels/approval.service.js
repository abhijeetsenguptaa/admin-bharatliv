const ReelModel = require("../../models/reels.model");

async function HandleAdminApprovalService(id) {
    try {
        const fetchReel = await ReelModel.findOne({ where: { id: id } });

        if (!fetchReel) {
            return {
                status: false,
                message: 'Reel not found!'
            };
        }

        fetchReel.hasApprovedByAdmin = !fetchReel.hasApprovedByAdmin;

        await fetchReel.save();

        return {
            status: true,
            message: "Admin Approval updated successfully."
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = HandleAdminApprovalService;