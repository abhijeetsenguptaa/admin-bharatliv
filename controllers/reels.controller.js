require('dotenv').config();


const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const UploadReelServices = require('../services/reels/uploadReels.service');
const FetchReelService = require('../services/reels/fetchReels.service');
const HandleAdminApprovalService = require('../services/reels/approval.service');
const DeleteReelService = require('../services/reels/deleteReel.service');
const ReelModel = require('../models/reels.model');

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
            const folderPath = 'reels/';
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



async function PostReelController(req, res) {
    try {
        const userID = req.userID;
        const { title, status, hasApprovedByAdmin } = req.body;

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

        const reelUploader = await UploadReelServices(userID, title, thumbNail, video, status, hasApprovedByAdmin);

        return res.status(reelUploader.status ? 200 : 404).json({
            status: reelUploader.status,
            message: reelUploader.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}



async function GetReelController(req, res) {
    try {
        const { id, userID, title, status, hasApprovedByAdmin } = req.query;

        const reelData = await FetchReelService(id, userID, title, status, hasApprovedByAdmin);

        return res.status(reelData.status ? 200 : 404).json({
            status: reelData.status,
            count: reelData.status ? reelData.count : 0,
            data: reelData.status ? reelData.data : [],
            message: reelData.status ? "List of Reels" : reelData.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}


async function HandleAdminApprovalController(req, res) {
    try {
        const id = req.params.id;

        const handleReels = await HandleAdminApprovalService(id);

        return res.status(handleReels.status ? 200 : 404).json({
            status: handleReels.status,
            message: handleReels.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function DeleteReelController(req, res) {
    try {
        const id = req.params.id;
        const data = await ReelModel.findByPk(id);

        const thumbNailKey = data.thumbNail.split('/').pop();
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'reels/' + thumbNailKey }).promise();

        const videoKey = data.video.split('/').pop();
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'reels/' + videoKey }).promise();

        const deleteVideo = await DeleteReelService(id);

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

module.exports = { upload, PostReelController, GetReelController, HandleAdminApprovalController, DeleteReelController };