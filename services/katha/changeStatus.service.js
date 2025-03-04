const KathaModel = require("../../models/katha.model");

async function HandleKathaStatusService(id) {
    try {
        const fetchKatha = await KathaModel.findOne({ where: { id: id } });

        if (!fetchKatha) {
            return {
                status: false,
                message: 'Content not found!'
            };
        }

        fetchKatha.status = !fetchKatha.status;

        await fetchKatha.save();

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

module.exports = HandleKathaStatusService;