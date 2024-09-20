const LanguageModel = require("../../models/language.model");

async function GetLanguageService(id, status) {
    try {
        let languageData;

        if (id) {
            languageData = await LanguageModel.findOne({ where: { id: id } });
            if (!languageData) {
                return {
                    status: false,
                    message: `Language with ID ${id} not found`
                };
            }
        } else if (status) {
            languageData = await LanguageModel.findOne({ where: { status: status } });
        } else {
            languageData = await LanguageModel.findAll();
        }

        return {
            status: true,
            count: languageData.length,
            data: languageData
        };
    } catch (error) {
        console.error("Error retrieving Language", error);
        return {
            status: false,
            message: "Failed to retrieve Language. Please try again later."
        };
    }
}

module.exports = GetLanguageService;
