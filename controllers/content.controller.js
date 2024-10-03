require('dotenv').config();


const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const PostContentServices = require('../services/content/postContent.service');
const ContentModel = require('../models/content.model');
const EditContentService = require('../services/content/editContent.service');
const GetContentService = require('../services/content/getContent.service');
const ApproveFromSuperAdmin = require('../services/content/approveFromSuperAdmin.service');
const ContentForManager = require('../services/content/contentForManager.service');
const GetContentSuperAdminService = require('../services/content/GetContentSuperAdmin.service');
const DeleteContentService = require('../services/content/deleteContent.service');
const HandleContentStatusService = require('../services/content/handleContentStatus.service');

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
            const folderPath = 'contents/';
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





async function PostContentController(req, res) {
    try {
        const { categoryID, organizationID, speakerID, languageID, title, status, rating } = req.body;

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

        const contentUploader = await PostContentServices(categoryID, organizationID, speakerID, languageID, title, thumbNail, video, status, rating);

        return res.status(contentUploader.status ? 200 : 404).json({
            status: contentUploader.status,
            message: contentUploader.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}




async function EditContentController(req, res) {
    try {
        const id = req.params.id;

        const contentItem = await ContentModel.findOne({ where: { id: id } });

        const { categoryID, title, status } = req.body;

        // Check if there's a new image uploaded
        let thumbNail = contentItem.thumbNail;
        let video = contentItem.video;

        if (req.files) {
            if (req.files['thumbNail']) {
                // Delete the previous thumbnail from S3 storage
                if (contentItem.thumbNail) {
                    const thumbNailKey = contentItem.thumbNail.split('/').pop();
                    await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'contents/' + thumbNailKey }).promise();
                }

                thumbNail = req.files['thumbNail'][0].location;
            }
            if (req.files['video']) {
                // Delete the previous video from S3 storage
                if (contentItem.video) {
                    const videoKey = contentItem.video.split('/').pop();
                    await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'contents/' + videoKey }).promise();
                }

                video = req.files['video'][0].location;
            }
        }


        // Call the service to edit the Content
        const editResult = await EditContentService(id, categoryID, title, thumbNail, video, status);

        // Respond based on the result from the service
        if (editResult.status) {
            return res.status(200).json({
                status: true,
                message: editResult.message
            });

        } else {
            return res.status(404).json({
                status: false,
                message: editResult.message
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}

async function GetContentController(req, res) {
    try {
        const { id, status, categoryID, organizationID, speakerID, languageID, userID, highlight, title } = req.query;

        const ContentData = await GetContentService(id, status, categoryID, organizationID, speakerID, languageID, userID, highlight, title);

        return res.status(ContentData.status ? 200 : 404).json({
            status: ContentData.status,
            count: ContentData.status ? ContentData.count : 0,
            data: ContentData.status ? ContentData.data : [],
            message: ContentData.status ? "List of Content" : ContentData.message,
            categories : ContentData.categories,
            languages  : ContentData.languages
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}

async function GetContentSuperAdminController(req, res) {
    try {
        const { id, status, categoryID, userID, hasApprovedByAdmin } = req.query;

        const ContentData = await GetContentSuperAdminService(id, status, categoryID, userID, hasApprovedByAdmin);

        return res.status(ContentData.status ? 200 : 404).json({
            status: ContentData.status,
            count: ContentData.status ? ContentData.count : 0,
            data: ContentData.status ? ContentData.data : [],
            message: ContentData.status ? "List of Content" : ContentData.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}

async function ApproveFromSuperAdminController(req, res) {
    try {
        const id = req.params.id;

        const approval = await ApproveFromSuperAdmin(id);

        return res.status(approval.status ? 200 : 500).json({
            status: approval.status,
            message: approval.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}

async function ContentAsPerManagerController(req, res) {
    try {
        const userID = req.userID;
        const { id, status, hasApprovedByAdmin } = req.query;
        const fetchContent = await ContentForManager(id, userID, status, hasApprovedByAdmin);

        return res.status(fetchContent.status ? 200 : 500).json({
            status: fetchContent.status,
            message: fetchContent.status ? fetchContent.message : "No data available",
            count: fetchContent.status ? fetchContent.count : null,
            data: fetchContent.status ? fetchContent.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error
        });
    }
}

async function DeleteContentController(req, res) {
    try {
        const id = req.params.id;
        const data = await ContentModel.findByPk(id);

        const thumbNailKey = data.thumbNail.split('/').pop();
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'contents/' + thumbNailKey }).promise();

        const videoKey = data.video.split('/').pop();
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'contents/' + videoKey }).promise();

        const deleteVideo = await DeleteContentService(id);

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

async function HandleStatusContentController(req, res) {
    try {
        const id = req.params.id;

        const handleContent = await HandleContentStatusService(id);

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


module.exports = { upload, PostContentController, GetContentController, EditContentController, ApproveFromSuperAdminController, ContentAsPerManagerController, GetContentSuperAdminController, DeleteContentController, HandleStatusContentController };