const PdfModel = require("../../models/pdf.model");

async function HandlePdfStatusService(id) {
    try {
        const fetchPdf = await PdfModel.findOne({ where: { id: id } });

        if (!fetchPdf) {
            return {
                status: false,
                message: 'Pdf not found!'
            };
        }

        fetchPdf.status = !fetchPdf.status;

        await fetchPdf.save();

        return {
            status: true,
            message: "Status updated successfully."
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = HandlePdfStatusService;