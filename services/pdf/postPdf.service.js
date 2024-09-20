const PdfModel = require("../../models/pdf.model");

async function PostPdfServices(title, status, file) {
    try {
        const Pdf = await PdfModel.create({ title, status, file });

        return {
            status: true,
            message: "Pdf has been added successfully.",
            data: Pdf
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports = PostPdfServices;