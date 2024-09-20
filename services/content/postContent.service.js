const CategoryModel = require("../../models/category.model");
const ContentModel = require("../../models/content.model");


async function PostContentServices(categoryID, organizationID, speakerID, languageID, title, thumbNail, video, status, rating) {
    try {
        const categoryData = await CategoryModel.findOne({ where: { id: categoryID } });
        const content = await ContentModel.create({ categoryID, organizationID, speakerID, languageID, title, thumbNail, video, status, rating });

        categoryData.totalVideos += 1;
        await categoryData.save();


        return {
            status: true,
            message: "Content has been added successfully.",
            data: content
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports = PostContentServices;