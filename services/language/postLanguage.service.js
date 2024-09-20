const LanguageModel = require("../../models/language.model");


async function PostLanguageServices(title, status) {
    try {
        const language = await LanguageModel.create({ title, status });

        return {
            status: true,
            message: "Language has been added successfully.",
            data: language
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports = PostLanguageServices;