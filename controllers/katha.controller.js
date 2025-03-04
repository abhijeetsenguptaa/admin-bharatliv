require('dotenv').config();


const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const KathaModel = require('../models/katha.model');
const PostKathaService = require('../services/katha/postKatha.service');
const GetKathaService = require('../services/katha/getKatha.service');
const HandleKathaStatusService = require('../services/katha/changeStatus.service');
const DeleteKathaService = require('../services/katha/deleteKatha.service');

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
            const folderPath = 'kathas/';
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





async function PostKathaController(req, res) {
    try {
        const { title, status, speakerID } = req.body;

        let thumbNail;
        let video;

        if (req.files) {
            if (req.files['thumbNail']) {
                thumbNail = req.files['thumbNail'][0].location.replace(/\s+/g, '');
            }
            if (req.files['video']) {
                video = req.files['video'][0].location.replace(/\s+/g, '');
            }
        }

        const kathaUploader = await PostKathaService(title, thumbNail, video, status, speakerID);

        return res.status(kathaUploader.status ? 200 : 404).json({
            status: kathaUploader.status,
            message: kathaUploader.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}





async function GetKathaController(req, res) {
    try {
        const { id, status, title, speakerID } = req.query;

        const kathaData = await GetKathaService(id, title, status, speakerID);

        return res.status(kathaData.status ? 200 : 404).json({
            status: kathaData.status,
            data: kathaData.status ? kathaData.data : [],
            message: kathaData.status ? "List of Content" : kathaData.message,

        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}


async function HandleStatusKathaController(req, res) {
    try {
        const id = req.params.id;

        const handleContent = await HandleKathaStatusService(id);

        return res.status(handleContent.status ? 200 : 404).json({
            status: handleContent.status,
            message: handleContent.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function DeleteKathaController(req, res) {
    try {
        const id = req.params.id;
        const data = await KathaModel.findByPk(id);

        const thumbNailKey = data.thumbNail.split('/').pop();
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'kathas/' + thumbNailKey }).promise();

        const videoKey = data.video.split('/').pop();
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'kathas/' + videoKey }).promise();

        const deleteVideo = await DeleteKathaService(id);

        return res.status(deleteVideo.status ? 200 : 500).json({
            status: deleteVideo.status,
            message: deleteVideo.message
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error
        });
    }
}


module.exports = { upload, PostKathaController, GetKathaController, HandleStatusKathaController, DeleteKathaController };