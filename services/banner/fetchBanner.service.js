const BannerModel = require("../../models/banner.model");

async function FetchBannerService(id, status, type, device) {
    try {
        const query = {};

        if (id) query.id = id;
        if (status) query.status = status;
        if (type) query.type = type;
        if (device) query.device = device;

        let BannerData;
        if (id) {
            BannerData = await BannerModel.findOne({ where: query });
            if (!BannerData) {
                return {
                    status: false,
                    message: `Banner with ID ${id} not found`
                };
            }
        } else {
            BannerData = await BannerModel.findAll({ where: query });
        }

        return {
            status: true,
            count: Array.isArray(BannerData) ? BannerData.length : 1,
            data: BannerData
        };
    } catch (error) {
        console.error("Error retrieving Banner:", error);
        return {
            status: false,
            message: "Failed to retrieve Banner. Please try again later."
        };
    }
}

module.exports = FetchBannerService;
