const ContentModel = require("../../models/content.model");

async function HandleContentStatusService(id) {
    try {
        const fetchContent = await ContentModel.findOne({ where: { id: id } });

        if (!fetchContent) {
            return {
                status: false,
                message: 'Content not found!'
            };
        }

        fetchContent.status = !fetchContent.status;

        await fetchContent.save();

        return {
            status: true,
            message: "Status updated successfully."
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = HandleContentStatusService;