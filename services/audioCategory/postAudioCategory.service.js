const AudioCategoryModel = require("../../models/audioCategory.model");


async function PostAudioCategoryServices(title, image, status) {
    try {
        const category = await AudioCategoryModel.create({ title, image, status });

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