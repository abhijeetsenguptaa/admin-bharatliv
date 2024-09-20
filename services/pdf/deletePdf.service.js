const PdfModel = require('../../models/pdf.model');

async function DeletePdfService(id) {
    try {
        // Find the Pdf by ID
        const PdfToDelete = await PdfModel.findOne({ where: { id: id } });

        // If the Pdf doesn't exist, return an error
        if (!PdfToDelete) {
            return {
                status: false,
                message: 'Pdf not found!'
            };
        }

        // If the Pdf exists, delete it
        await PdfToDelete.destroy();

        return {
            status: true,
            message: 'Pdf deleted successfully'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeletePdfService;
