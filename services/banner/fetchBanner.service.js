const BannerModel = require("../../models/banner.model");

async function FetchBannerService(id, status, type) {
    try {
        let BannerData;

        if (id) {
            BannerData = await BannerModel.findOne({ where: { id: id } });
            if (!BannerData) {
                return {
                    status: false,
                    message: `Banner with ID ${id} not found`
                };
            }
        } else if (status) {
            BannerData = await BannerModel.findAll({ where: { status: status } });
        } else if (type) {
            BannerData = await BannerModel.findAll({ where: { type: type } });
        } else {
            BannerData = await BannerModel.findAll();
        }

        return {
            status: true,
            count: BannerData.length,
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
