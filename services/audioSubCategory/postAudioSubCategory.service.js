const AudioSubCategoryModel = require("../../models/audioSubCategory.model");


async function PostAudioSubCategoryServices(audioCategoryID, title, image, status) {
    try {
        const category = await AudioSubCategoryModel.create({ audioCategoryID, title, image, status });

        return {
            status: true,
            message: "Audio Sub-Category has been added successfully.",
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

module.exports = PostAudioSubCategoryServices;