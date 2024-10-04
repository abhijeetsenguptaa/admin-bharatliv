require('dotenv').config();


const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const PostSeriesServices = require('../services/series/postSeries.service');
const GetSeriesService = require('../services/series/getSeries.service');
const DeleteSeriesService = require('../services/series/deleteSeries.service');
const SeriesModel = require('../models/series.model');
const HandleSeriesStatusService = require('../services/series/handleSeriesStatus.service');

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
            const folderPath = 'series/';
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


async function PostSeriesController(req, res) {
    try {
        const { title, status, speakerID, organizationID, languageID } = req.body;

        let image;
        if (req.file) {
            image = req.file.location;
        }

        const SeriesUploader = await PostSeriesServices(title, image, status, speakerID, organizationID, languageID);

        return res.status(SeriesUploader.status ? 200 : 404).json({
            status: SeriesUploader.status,
            message: SeriesUploader.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetSeriesController(req, res) {
    try {
        const { id, speakerID, organizationID, status } = req.query;

        const SeriesData = await GetSeriesService(id, speakerID, organizationID, status);

        return res.status(SeriesData.status ? 200 : 404).json({
            status: SeriesData.status,
            count: SeriesData.status ? SeriesData.count : 0,
            data: SeriesData.status ? SeriesData.data : [],
            message: SeriesData.status ? "List of Series" : SeriesData.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function EditSeriesController(req, res) {
    try {
        const id = req.params.id;
        const speaker = await SeriesModel.findByPk(id);

        if (!speaker) {
            return res.status(404).json({
                status: false,
                message: 'Speaker not found',
            });
        }

        const { organizationID, speakerID, title, status } = req.body;
        let image = speaker.image; // Existing image URL

        // If a new image is uploaded, handle the update
        if (req.file && req.file.location) {
            // Assuming the new image URL is in req.file.location (for multer-s3)

            if (image) {
                // Extract the key from the current image URL
                const imageUrlParts = speaker.image.split('/');
                const imageKey = imageUrlParts[imageUrlParts.length - 1];

                // Delete the old image from S3 storage
                await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'series/' + imageKey }).promise();
            }

            // Update image to the new uploaded file's location
            image = req.file.location;
        }

        // Update speaker details
        if (organizationID) speaker.organizationID = organizationID;
        if (speakerID) speaker.speakerID = speakerID;
        if (title) speaker.title = title;
        if (status) speaker.status = status;
        speaker.image = image; // Save the new image URL (if updated)

        // Save the updated speaker details to the database
        await speaker.save();

        // Return success response
        return res.status(200).json({
            status: true,
            message: 'Series has been updated successfully!',
            speaker
        });

    } catch (error) {
        console.error('Error in EditSeriesController:', error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function DeleteSeriesController(req, res) {
    try {
        const id = req.params.id;
        const SeriesItem = await SeriesModel.findOne({ where: { id: id } });

        if (SeriesItem.image != null) {
            // Extract the key from the image URL
            const imageUrlParts = SeriesItem.image.split('/');
            const imageKey = imageUrlParts[imageUrlParts.length - 1];

            // Delete the image from S3 storage
            await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'series/' + imageKey }).promise();

            // Delete the Series from the database
            const deleteSeries = await DeleteSeriesService(id);

            return res.status(deleteSeries.status ? 200 : 404).json({
                status: deleteSeries.status,
                message: deleteSeries.message
            });
        }

        // Delete the Series from the database
        const deleteSeries = await DeleteSeriesService(id);

        return res.status(deleteSeries.status ? 200 : 404).json({
            status: deleteSeries.status,
            message: deleteSeries.message
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function HandleStatusSeriesController(req, res) {
    try {
        const id = req.params.id;

        const handleSeries = await HandleSeriesStatusService(id);

        return res.status(handleSeries.status ? 200 : 404).json({
            status: handleSeries.status,
            message: handleSeries.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { s3, upload, PostSeriesController: PostSeriesController, GetSeriesController, EditSeriesController, DeleteSeriesController, HandleStatusSeriesController };