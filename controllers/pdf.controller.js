require('dotenv').config();


const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const PdfModel = require('../models/pdf.model');
const PostPdfServices = require('../services/pdf/postPdf.service');
const GetPdfService = require('../services/pdf/getPdf.service');

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
            const folderPath = 'pdf/';
            const currentDate = new Date().toISOString().split('T')[0];
            const fileExtension = file.originalname.split('.').pop();
            const uniqueKey = currentDate + '-' + Math.floor(Math.random() * 10000) + '.' + fileExtension;
            const completeKey = folderPath + uniqueKey;
            cb(null, completeKey);
        }
    })
});


async function PostPdfController(req, res) {
    try {
        const { title, status } = req.body;
        let file;
        if (req.file) {
            file = req.file.location;
        }
        const PdfUploader = await PostPdfServices(title, status, file);

        return res.status(PdfUploader.status ? 200 : 404).json({
            status: PdfUploader.status,
            message: PdfUploader.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetPdfController(req, res) {
    try {
        const { id, status } = req.query;

        const PdfData = await GetPdfService(id, status);

        return res.status(PdfData.status ? 200 : 404).json({
            status: PdfData.status,
            count: PdfData.status ? PdfData.count : 0,
            data: PdfData.status ? PdfData.data : [],
            message: PdfData.status ? "List of Documents" : PdfData.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function EditPdfController(req, res) {
    try {
        const id = req.params.id;
        // const PdfItem = await PdfModel.findOne({ where: { id: id } });

        const { title, status } = req.body;

        // Check if there's a new image uploaded
        // let image;
        // if (req.file) {
        //     // Extract the key from the image URL
        //     const imageUrlParts = PdfItem.image.split('/');
        //     const imageKey = imageUrlParts[imageUrlParts.length - 1];

        //     // Delete the image from S3 storage
        //     await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'categories/' + imageKey }).promise();

        //     image = req.file.location;
        // }

        // Call the service to edit the Pdf
        const editResult = await EditPdfService(id, title, status);

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
            message: 'Internal Server Error',
        });
    }
}

async function DeletePdfController(req, res) {
    try {
        const id = req.params.id;
        // const PdfItem = await PdfModel.findOne({ where: { id: id } });

        // Extract the key from the image URL
        // const imageUrlParts = PdfItem.image.split('/');
        // const imageKey = imageUrlParts[imageUrlParts.length - 1];

        // Delete the image from S3 storage
        // await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'categories/' + imageKey }).promise();

        // Delete the Pdf from the database
        const deletePdf = await DeletePdfService(id);

        return res.status(deletePdf.status ? 200 : 404).json({
            status: deletePdf.status,
            message: deletePdf.message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function HandleStatusPdfController(req, res) {
    try {
        const id = req.params.id;

        const handlePdf = await HandlePdfStatusService(id);

        return res.status(handlePdf.status ? 200 : 404).json({
            status: handlePdf.status,
            message: handlePdf.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { s3, upload, PostPdfController: PostPdfController, GetPdfController, EditPdfController, DeletePdfController, HandleStatusPdfController };