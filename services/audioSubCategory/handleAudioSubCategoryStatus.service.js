const AudioSubCategoryModel = require("../../models/audioSubCategory.model");

async function HandleAudioSubCategoryStatusService(id) {
    try {
        const fetchAudioSubCategory = await AudioSubCategoryModel.findOne({ where: { id: id } });

        if (!fetchAudioSubCategory) {
            return {
                status: false,
                message: 'Audio Sub-Category not found!'
            };
        }

        fetchAudioSubCategory.status = !fetchAudioSubCategory.status;

        await fetchAudioSubCategory.save();

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

module.exports = HandleAudioSubCategoryStatusService;