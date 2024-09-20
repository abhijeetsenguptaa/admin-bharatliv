const LanguageModel = require('../../models/language.model');
const fs = require('fs').promises;

async function DeleteLanguageService(id) {
    try {
        // Find the language by ID
        const languageToDelete = await LanguageModel.findOne({ where: { id: id } });

        // If the language doesn't exist, return an error
        if (!languageToDelete) {
            return {
                status: false,
                message: 'language not found!'
            };
        }

        // If the language exists, delete it
        await languageToDelete.destroy();

        return {
            status: true,
            message: 'language deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteLanguageService;
