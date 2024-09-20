require('dotenv').config();


const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const CategoryModel = require('../models/category.model');
const PostCategoryServices = require('../services/category/postCategory.service');
const GetCategoryService = require('../services/category/getCategory.service');
const EditCategoryService = require('../services/category/editCategory.service');
const DeleteCategoryService = require('../services/category/deleteCategory.service');
const HandleCategoryStatusService = require('../services/category/handleCategoryStatus.service');

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
            // Set the folder path within the bucket where you want to store the images
            const folderPath = 'categories/';
            // Generate a unique key for the file, you can use the original filename or any other unique identifier
            const uniqueKey = Date.now() + '-' + file.originalname;
            // Concatenate the folder path and the unique key to form the complete key
            const completeKey = folderPath + uniqueKey;
            cb(null, completeKey);
        }
    })
});


async function PostCategoryController(req, res) {
    try {
        const { title, status } = req.body;

        const categoryUploader = await PostCategoryServices(title, status);

        return res.status(categoryUploader.status ? 200 : 404).json({
            status: categoryUploader.status,
            message: categoryUploader.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetCategoryController(req, res) {
    try {
        const { id, status } = req.query;

        const CategoryData = await GetCategoryService(id, status);

        return res.status(CategoryData.status ? 200 : 404).json({
            status: CategoryData.status,
            count: CategoryData.status ? CategoryData.count : 0,
            data: CategoryData.status ? CategoryData.data : [],
            message: CategoryData.status ? "List of Categories" : CategoryData.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function EditCategoryController(req, res) {
    try {
        const id = req.params.id;
        // const categoryItem = await CategoryModel.findOne({ where: { id: id } });

        const { title, status } = req.body;

        // Check if there's a new image uploaded
        // let image;
        // if (req.file) {
        //     // Extract the key from the image URL
        //     const imageUrlParts = categoryItem.image.split('/');
        //     const imageKey = imageUrlParts[imageUrlParts.length - 1];

        //     // Delete the image from S3 storage
        //     await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'categories/' + imageKey }).promise();

        //     image = req.file.location;
        // }

        // Call the service to edit the Category
        const editResult = await EditCategoryService(id, title, status);

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

async function DeleteCategoryController(req, res) {
    try {
        const id = req.params.id;
        // const categoryItem = await CategoryModel.findOne({ where: { id: id } });

        // Extract the key from the image URL
        // const imageUrlParts = categoryItem.image.split('/');
        // const imageKey = imageUrlParts[imageUrlParts.length - 1];

        // Delete the image from S3 storage
        // await s3.deleteObject({ Bucket: BUCKET_NAME, Key: 'categories/' + imageKey }).promise();

        // Delete the category from the database
        const deleteCategory = await DeleteCategoryService(id);

        return res.status(deleteCategory.status ? 200 : 404).json({
            status: deleteCategory.status,
            message: deleteCategory.message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function HandleStatusCategoryController(req, res) {
    try {
        const id = req.params.id;

        const handleCategory = await HandleCategoryStatusService(id);

        return res.status(handleCategory.status ? 200 : 404).json({
            status: handleCategory.status,
            message: handleCategory.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { s3, upload, PostCategoryController: PostCategoryController, GetCategoryController, EditCategoryController, DeleteCategoryController, HandleStatusCategoryController };