const PdfModel = require("../../models/pdf.model");

async function GetPdfService(id, status) {
    try {
        let PdfData;

        if (id) {
            PdfData = await PdfModel.findOne({ where: { id: id } });
            if (!PdfData) {
                return {
                    status: false,
                    message: `Pdf with ID ${id} not found`
                };
            }
        } else if (status) {
            PdfData = await PdfModel.findOne({ where: { status: status } });
        } else {
            PdfData = await PdfModel.findAll();
        }

        return {
            status: true,
            count: PdfData.length,
            data: PdfData
        };
    } catch (error) {
        console.error("Error retrieving Pdf:", error);
        return {
            status: false,
            message: "Failed to retrieve Pdf. Please try again later."
        };
    }
}

module.exports = GetPdfService;
