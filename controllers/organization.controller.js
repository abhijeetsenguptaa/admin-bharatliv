require('dotenv').config();

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const PostOrganizationServices = require('../services/organisation/uploadOrganisation.service');
const FetchOrganizationService = require('../services/organisation/fetchOrganization.service');
const StatusChangeService = require('../services/organisation/statusChanger.service');
const OrganizationModel = require('../models/organization.model');
const DeleteOrganizationService = require('../services/organisation/deleteOrganization.service');

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
            const folderPath = 'organizations/';
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



async function UploadOrganizationController(req, res) {
    try {
        const { title } = req.body;

        let image;
        if (req.file) {
            image = req.file.location;
        }

        const createOrganization = await PostOrganizationServices(title, image);

        return res.status(createOrganization.status ? 200 : 404).json({
            status: createOrganization.status,
            message: createOrganization.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetOrganizationController(req, res) {
    try {
        const { id, status } = req.query;

        const OrganizationData = await FetchOrganizationService(id, status);

        return res.status(OrganizationData.status ? 200 : 404).json({
            status: OrganizationData.status,
            count: OrganizationData.status ? OrganizationData.count : 0,
            data: OrganizationData.status ? OrganizationData.data : [],
            message: OrganizationData.status ? "List of Categories" : OrganizationData.message
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

async function DeleteOrganizationController(req, res) {
    try {
        const id = req.params.id;
        const categoryItem = await OrganizationModel.findOne({ where: { id: id } });

        // Extract the key from the image URL
        const imageUrlParts = categoryItem.image.split('/');
        const imageKey = imageUrlParts[imageUrlParts.length - 1];

        // Delete the image from S3 storage
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'organizations/' + imageKey }).promise();

        // Delete the category from the database
        const deleteSpeaker = await DeleteOrganizationService(id);

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

module.exports = { upload, UploadOrganizationController, GetOrganizationController, StatusChangeController, DeleteOrganizationController };