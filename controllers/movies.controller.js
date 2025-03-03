require('dotenv').config();


const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const PostMoviesService = require('../services/movies/postMovies.service');
const GetMoviesService = require('../services/movies/getMovies.service');
const HandleMoviesStatusService = require('../services/movies/handleMoviesStatus.service');

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
            const folderPath = 'movies/';
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





async function PostMoviesController(req, res) {
    try {
        const { title, status, rating } = req.body;

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

        const moviesUploader = await PostMoviesService(title, thumbNail, video, status, rating);

        return res.status(moviesUploader.status ? 200 : 404).json({
            status: moviesUploader.status,
            message: moviesUploader.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}





async function GetMoviesController(req, res) {
    try {
        const { id, status, title } = req.query;

        const moviesData = await GetMoviesService(id, title, status);

        return res.status(moviesData.status ? 200 : 404).json({
            status: moviesData.status,
            data: moviesData.status ? moviesData.data : [],
            message: moviesData.status ? "List of Content" : moviesData.message,

        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}


async function HandleStatusMoviesController(req, res) {
    try {
        const id = req.params.id;

        const handleContent = await HandleMoviesStatusService(id);

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


module.exports = { upload, PostMoviesController, GetMoviesController, HandleStatusMoviesController };