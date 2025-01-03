const FetchUrlService = require("../services/urlUploader/fetchUrl.service");
const UploadUrlService = require("../services/urlUploader/uploadUrl.service");

async function UploadUrlController(req, res) {
    try {
        const { title, description, url } = req.body;

        const urlUploading = await UploadUrlService(title, description, url);

        return res.status(urlUploading.status ? 200 : 404).json({
            status: urlUploading.status,
            message: urlUploading.message,
            data: urlUploading.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
};


async function FetchUrlController(req, res) {
    try {
        const { id, title, status, url } = req.query;

        const urlUploading = await FetchUrlService(id, title, status, url);

        return res.status(urlUploading.status ? 200 : 404).json({
            status: urlUploading.status,
            data: urlUploading.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports = { UploadUrlController, FetchUrlController };