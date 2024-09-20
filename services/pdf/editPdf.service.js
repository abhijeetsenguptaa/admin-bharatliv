const PdfModel = require("../../models/pdf.model");

async function EditPdfService(id, title, status) {
    try {
        const fetchPdf = await PdfModel.findOne({ where: { id: id } });

        if (!fetchPdf) {
            return {
                status: false,
                message: 'Pdf not found!'
            };
        }

        // Update Pdf properties
        fetchPdf.title = title;
        fetchPdf.status = status;

        // Save changes to the Pdf
        await fetchPdf.save();

        return {
            status: true,
            message: 'Pdf updated successfully'
        };

    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = EditPdfService;