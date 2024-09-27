require('dotenv').config();

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const PostSpeakerServices = require('../services/speakers/uploadSpeakers.service');
const FetchSpeakerService = require('../services/speakers/fetchSpeakers.service');
const StatusChangeService = require('../services/speakers/statusChanger.service');
const DeleteSpeakerService = require('../services/speakers/deleteSpeakers.service');
const SpeakersModel = require('../models/speakers.model');
const EditSpeakerService = require('../services/speakers/editSpeakers.service');

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
            const folderPath = 'speakers/';
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



async function UploadSpeakersController(req, res) {
    try {
        const { organizationID, title } = req.body;

        let image;
        if (req.file) {
            image = req.file.location;
        }

        const createSpeakers = await PostSpeakerServices(organizationID, title, image);

        return res.status(createSpeakers.status ? 200 : 404).json({
            status: createSpeakers.status,
            message: createSpeakers.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetSpeakersController(req, res) {
    try {
        const { id, organizationID, status } = req.query;

        const SpeakersData = await FetchSpeakerService(id, organizationID, status);

        return res.status(SpeakersData.status ? 200 : 404).json({
            status: SpeakersData.status,
            count: SpeakersData.status ? SpeakersData.count : 0,
            data: SpeakersData.status ? SpeakersData.data : [],
            message: SpeakersData.status ? "List of Categories" : SpeakersData.message
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

async function DeleteSpeakerController(req, res) {
    try {
        const id = req.params.id;
        const categoryItem = await SpeakersModel.findOne({ where: { id: id } });

        // Extract the key from the image URL
        const imageUrlParts = categoryItem.image.split('/');
        const imageKey = imageUrlParts[imageUrlParts.length - 1];

        // Delete the image from S3 storage
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'speakers/' + imageKey }).promise();

        // Delete the category from the database
        const deleteSpeaker = await DeleteSpeakerService(id);

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


async function EditSpeakerController(req, res) {
    try {
        const id = req.params.id;
        const speaker = await SpeakersModel.findByPk(id);
        const { organizationID, title, status } = req.body;

        let image = speaker.image;

        if (req.file) {
            if (image) {
                // Extract the key from the image URL
                const imageUrlParts = speaker.image.split('/');
                const imageKey = imageUrlParts[imageUrlParts.length - 1];

                // Delete the image from S3 storage
                await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'speakers/' + imageKey }).promise();
                image = req.file.location;
            }
        }

        if (organizationID) {
            speaker.organizationID = organizationID;
        }

        if (title) {
            speaker.title = title;
        }

        if (status) {
            speaker.status = status;
        }

        await speaker.save();

        return res.status(200).json({
            status: true,
            message: 'Speaker has been Updated successfully!'
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

module.exports = { upload, UploadSpeakersController, GetSpeakersController, StatusChangeController, DeleteSpeakerController, EditSpeakerController };