const DeleteLanguageService = require("../services/language/deleteLanguage.service");
const GetLanguageService = require("../services/language/getLanguage.service");
const PostLanguageServices = require("../services/language/postLanguage.service");
const StatusChangeService = require("../services/language/statusChanger.service");

async function PostLanguageController(req, res) {
    try {
        const { title, status } = req.body;

        const languageUploader = await PostLanguageServices(title, status);

        return res.status(languageUploader.status ? 200 : 404).json({
            status: languageUploader.status,
            message: languageUploader.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetLanguageController(req, res) {
    try {
        const { id, status } = req.query;

        const LanguageData = await GetLanguageService(id, status);

        return res.status(LanguageData.status ? 200 : 404).json({
            status: LanguageData.status,
            count: LanguageData.status ? LanguageData.count : 0,
            data: LanguageData.status ? LanguageData.data : [],
            message: LanguageData.status ? "List of Language" : LanguageData.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function StatusChangeController(req, res) {
    try {
        const id = req.params.id;
        const dataRequired = await StatusChangeService(id);

        return res.status(dataRequired ? 200 : 404).json({
            status: dataRequired.status,
            message: dataRequired.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function DeleteLanguageController(req, res) {
    try {
        const id = req.params.id;
        // const categoryItem = await CategoryModel.findOne({ where: { id: id } });

        // Extract the key from the image URL
        // const imageUrlParts = categoryItem.image.split('/');
        // const imageKey = imageUrlParts[imageUrlParts.length - 1];

        // Delete the image from S3 storage
        // await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'categories/' + imageKey }).promise();

        // Delete the category from the database
        const deleteCategory = await DeleteLanguageService(id);

        return res.status(deleteCategory.status ? 200 : 404).json({
            status: deleteCategory.status,
            message: deleteCategory.message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

module.exports = { PostLanguageController, GetLanguageController, StatusChangeController, DeleteLanguageController };