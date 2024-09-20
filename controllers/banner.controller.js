require('dotenv').config();

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const PostBannerServices = require('../services/banner/uploadBanner.service');
const FetchBannerService = require('../services/banner/fetchBanner.service');
const BannerModel = require('../models/banner.model');
const DeleteBannerService = require('../services/banner/deleteBanner.service');
const StatusChangeService = require('../services/banner/statusChanger.service');

aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: process.env.REGION,
    // Note: 'bucket' is not a valid AWS SDK configuration property
});

const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // Set the folder path within the bucket where you want to store the files
            const folderPath = 'banners/';
            // Get the current date in the format 'YYYY-MM-DD'
            const currentDate = new Date().toISOString().split('T')[0];
            // Get the file extension
            const fileExtension = file.originalname.split('.').pop();
            // Generate a unique key using the current date and file extension
            const uniqueKey = currentDate + '-' + Math.floor(Math.random() * 10000) + '.' + fileExtension;
            // Concatenate the folder path and the unique key to form the complete key
            const completeKey = folderPath + uniqueKey;
            cb(null, completeKey);
        }
    })
});



async function UploadBannerController(req, res) {
    try {
        const { title } = req.body;

        let image;
        if (req.file) {
            image = req.file.location;
        }

        const createBanner = await PostBannerServices(title, image);

        return res.status(createBanner.status ? 200 : 404).json({
            status: createBanner.status,
            message: createBanner.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetBannerController(req, res) {
    try {
        const { id, status } = req.query;

        const BannerData = await FetchBannerService(id, status);

        return res.status(BannerData.status ? 200 : 404).json({
            status: BannerData.status,
            count: BannerData.status ? BannerData.count : 0,
            data: BannerData.status ? BannerData.data : [],
            message: BannerData.status ? "List of Categories" : BannerData.message
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

async function DeleteBannerController(req, res) {
    try {
        const id = req.params.id;
        const categoryItem = await BannerModel.findOne({ where: { id: id } });

        // Extract the key from the image URL
        const imageUrlParts = categoryItem.image.split('/');
        const imageKey = imageUrlParts[imageUrlParts.length - 1];

        // Delete the image from S3 storage
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'banners/' + imageKey }).promise();

        // Delete the category from the database
        const deleteSpeaker = await DeleteBannerService(id);

        return res.status(deleteSpeaker.status ? 200 : 404).json({
            status: deleteSpeaker.status,
            message: deleteSpeaker.message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

module.exports = { upload, UploadBannerController, GetBannerController, StatusChangeController, DeleteBannerController };