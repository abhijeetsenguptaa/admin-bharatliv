const ContentModel = require("../../models/content.model");
const fs = require('fs').promises; // Import the 'fs' module for file system operations

async function EditContentService(id, categoryID, title, thumbNail, video, status) {
    try {
        const fetchContent = await ContentModel.findOne({ where: { id: id } });

        if (!fetchContent) {
            return {
                status: false,
                message: 'Content not found!'
            };
        }

        // Update Content properties
        if(categoryID){
            fetchContent.categoryID = categoryID;
        }
        
        if(title){
            fetchContent.title = title;
        }
        
        if(thumbNail){
            fetchContent.thumbNail = thumbNail;
        }
        
        if(video){
            fetchContent.video = video;
        }
        
        if(status){
            fetchContent.status = status;
        }
        


        // Save changes to the Content
        await fetchContent.save();

        return {
            status: true,
            message: 'Content updated successfully'
        };

    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = EditContentService;