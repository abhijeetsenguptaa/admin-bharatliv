const SeriesVideoModel = require("../../models/seriesVideo.model");


async function PostSeriesVideoServices(seriesID, title, thumbNail, video, status, rating) {
    try {

        const series = await SeriesVideoModel.create({ seriesID, title, thumbNail, video, status, rating });

        return {
            status: true,
            message: "Series has been added successfully.",
            data: series
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports = PostSeriesVideoServices;