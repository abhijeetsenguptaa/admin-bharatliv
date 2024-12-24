const AudioCategoryModel = require("../../models/audioCategory.model");


async function PostAudioCategoryServices(title, image, status, device) {
    try {
        const category = await AudioCategoryModel.create({ title, image, status, device });

        return {
            status: true,
            message: "Audio Category has been added successfully.",
            data: category
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports = PostAudioCategoryServices;