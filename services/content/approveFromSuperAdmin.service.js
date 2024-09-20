const ContentModel = require("../../models/content.model");

async function ApproveFromSuperAdmin(id) {
    try {
        const fetchContent = await ContentModel.findOne({ where: { id: id } });

        if (!fetchContent) {
            return {
                status: false,
                message: 'Content not found!'
            };
        }

        fetchContent.hasApprovedByAdmin = !fetchContent.hasApprovedByAdmin;

        await fetchContent.save();

        return {
            status: true,
            message: "Video approval Status updated successfully."
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = ApproveFromSuperAdmin;