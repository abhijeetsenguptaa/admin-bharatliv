require('dotenv').config();


const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const PostAudioCategoryServices = require('../services/audioCategory/postAudioCategory.service');
const GetAudioCategoryService = require('../services/audioCategory/getAudioCategory.service');
const AudioCategoryModel = require('../models/audioCategory.model');
const DeleteAudioCategoryService = require('../services/audioCategory/deleteAudioCategory.service');
const HandleAudioCategoryStatusService = require('../services/audioCategory/handleAudioCategoryStatus.service');

aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: process.env.REGION,
    // Note: 'bucket' is not a valid AWS SDK configuration property
});

const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new aws.S3();

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: BUCKET_NAME,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             // cb(null, Date.now().toString())
//             cb(null, file.originalname)
//         }
//     })
// });

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // Set the folder path within the bucket where you want to store the files
            const folderPath = 'audio-categories/';
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


async function PostAudioCategoryController(req, res) {
    try {
        const { title, status } = req.body;

        let image;
        if (req.file) {
            image = req.file.location;
        }

        const audioCategoryUploader = await PostAudioCategoryServices(title, image, status);

        return res.status(audioCategoryUploader.status ? 200 : 404).json({
            status: audioCategoryUploader.status,
            message: audioCategoryUploader.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetAudioCategoryController(req, res) {
    try {
        const { id, status } = req.query;

        const AudioCategoryData = await GetAudioCategoryService(id, status);

        return res.status(AudioCategoryData.status ? 200 : 404).json({
            status: AudioCategoryData.status,
            count: AudioCategoryData.status ? AudioCategoryData.count : 0,
            data: AudioCategoryData.status ? AudioCategoryData.data : [],
            message: AudioCategoryData.status ? "List of Audio Categories" : AudioCategoryData.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function DeleteAudioCategoryController(req, res) {
    try {
        const id = req.params.id;
        const categoryItem = await AudioCategoryModel.findOne({ where: { id: id } });

        // Extract the key from the image URL
        const imageUrlParts = categoryItem.image.split('/');
        const imageKey = imageUrlParts[imageUrlParts.length - 1];

        // Delete the image from S3 storage
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'audio-categories/' + imageKey }).promise();

        // Delete the category from the database
        const deleteAudioCategory = await DeleteAudioCategoryService(id);

        return res.status(deleteAudioCategory.status ? 200 : 404).json({
            status: deleteAudioCategory.status,
            message: deleteAudioCategory.message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function HandleStatusAudioCategoryController(req, res) {
    try {
        const id = req.params.id;

        const handleAudioCategory = await HandleAudioCategoryStatusService(id);

        return res.status(handleAudioCategory.status ? 200 : 404).json({
            status: handleAudioCategory.status,
            message: handleAudioCategory.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function EditAudioCategoryController(req, res) {
    try {
        const id = req.params.id;
        const speaker = await AudioCategoryModel.findByPk(id);

        if (!speaker) {
            return res.status(404).json({
                status: false,
                message: 'Audio Category not found',
            });
        }

        const { title, status } = req.body;
        let image = speaker.image; // Existing image URL

        // If a new image is uploaded, handle the update
        if (req.file && req.file.location) {
            // Assuming the new image URL is in req.file.location (for multer-s3)

            if (image) {
                // Extract the key from the current image URL
                const imageUrlParts = speaker.image.split('/');
                const imageKey = imageUrlParts[imageUrlParts.length - 1];

                // Delete the old image from S3 storage
                await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'audio-categories/' + imageKey }).promise();
            }

            // Update image to the new uploaded file's location
            image = req.file.location;
        }

        // Update speaker details
        if (title) speaker.title = title;
        if (status) speaker.status = status;
        speaker.image = image; // Save the new image URL (if updated)

        // Save the updated speaker details to the database
        await speaker.save();

        // Return success response
        return res.status(200).json({
            status: true,
            message: 'Audio Category has been updated successfully!',
            speaker
        });

    } catch (error) {
        console.error('Error in EditAudioCategoryController:', error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { s3, upload, PostAudioCategoryController, GetAudioCategoryController, DeleteAudioCategoryController, HandleStatusAudioCategoryController, EditAudioCategoryController };