require('dotenv').config();


const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const PostAudioService = require('../services/audio/postAudio.service');
const AudioModel = require('../models/audio.model');
const GetAudioService = require('../services/audio/getAudio.service');

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
            const folderPath = 'audios/';
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



async function PostAudioController(req, res) {
    try {
        const { audioCategoryID, audioSubCategoryID, title, status } = req.body;

        let thumbNail;
        let audio;

        if (req.files) {
            if (req.files['thumbNail']) {
                thumbNail = req.files['thumbNail'][0].location.replace(/\s+/g, '');
            }
            if (req.files['audio']) {
                audio = req.files['audio'][0].location.replace(/\s+/g, '');
            }
        }

        const audioController = await PostAudioService(audioCategoryID, audioSubCategoryID, title, thumbNail, audio, status);

        return res.status(audioController.status ? 200 : 404).json({
            status: audioController.status,
            message: audioController.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
};

async function GetAudioController(req, res) {
    try {
        const { id, audioCategoryID, audioSubCategoryID, title } = req.query;

        const audioMenu = await GetAudioService(id, audioCategoryID, audioSubCategoryID, title);

        return res.status(audioMenu.status ? 200 : 404).json({
            status: audioMenu.status,
            message: audioMenu.message,
            data: audioMenu.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}


module.exports = { upload, PostAudioController, GetAudioController };