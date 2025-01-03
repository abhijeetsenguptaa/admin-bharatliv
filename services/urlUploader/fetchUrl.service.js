const UrlModel = require("../../models/url.model");

async function FetchUrlService(id, title, status, url) {
    try {
        let speakerData;

        if (id) {
            speakerData = await UrlModel.findOne({ where: { id: id } });
            if (!speakerData) {
                return {
                    status: false,
                    message: `URL with ID ${id} not found`
                };
            }
        } else if (title) {
            speakerData = await UrlModel.fineOne({ where: { title: title } });
        } else if (status) {
            speakerData = await UrlModel.findAll({ where: { status: status } });
        } else if (url) {
            speakerData = await UrlModel.fineOne({ where: { url: url } });
        } else {
            speakerData = await UrlModel.findAll();
        }
        return {
            status: true,
            message: "Data found successfully!",
            data: speakerData
        };
    } catch (error) {
        console.error("Error retrieving URl:", error);
        return {
            status: false,
            message: "Failed to retrieve URL. Please try again later."
        };
    }
}

module.exports = FetchUrlService;
