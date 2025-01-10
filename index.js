// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import database connection configuration
const connection = require('./configs/connection');
const userRoutes = require('./routers/users.routes');
const categoryRoutes = require('./routers/category.routes');
const contentRoutes = require('./routers/content.routes');
const documentRoutes = require('./routers/pdf.routes');
const organizationRoute = require('./routers/organization.routes');
const speakerRoutes = require('./routers/speakers.routes');
const languageRoute = require('./routers/language.routes');
const adminRoutes = require('./routers/admin.routes');
const bannerRoutes = require('./routers/banner.routes');
const reelsRoutes = require('./routers/reels.routes');
const audioCategoryRoutes = require('./routers/audioCategory.routes');
const audioSubCategoryRoutes = require('./routers/audioSubCategory.routes');
const seriesRoutes = require('./routers/series.routes');
const seriesVideoRoutes = require('./routers/seriesVideo.routes');
const audioRoutes = require('./routers/audio.routes');
const urlRoutes = require('./routers/url.routes');
const SpeakersModel = require('./models/speakers.model');
const ContentModel = require('./models/content.model');
const AudioModel = require('./models/audio.model');
const { Op } = require('sequelize');
const reelAdminRoutes = require('./routers/reel-admin.routes');




// Set the port for the server to run on, defaulting to 9000 if not specified in the environment
const PORT = process.env.PORT || 9000;

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());


// Fix the missing parenthesis in the following line
app.use(express.static(path.join(__dirname, './views'))); // Add the missing parenthesis and close the 'path.join' function call
/*Routes*/
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/series-videos', seriesVideoRoutes);
app.use('/api/audio', audioRoutes);
app.use('/api/audio-categories', audioCategoryRoutes);
app.use('/api/audio-sub-categories', audioSubCategoryRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/document', documentRoutes);
app.use('/api/organizations', organizationRoute);
app.use('/api/speakers', speakerRoutes);
app.use('/api/languages', languageRoute);
app.use('/api/banners', bannerRoutes);
app.use('/api/reels', reelsRoutes);
app.use('/api/url', urlRoutes);
app.use('/api/admin-reels', reelAdminRoutes);

app.get('/api/search', async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({
                message: "Title parameter is required."
            });
        }

        console.log(`Search title: ${title}`);

        // Case-insensitive search for titles
        const speakers = await SpeakersModel.findAll({
            where: {
                title: {
                    [Op.like]: `%${title}%`,
                }
            }
        });

        const videos = await ContentModel.findAll({
            where: {
                title: {
                    [Op.like]: `%${title}%`,
                }
            }
        });

        const audios = await AudioModel.findAll({
            where: {
                title: {
                    [Op.like]: `%${title}%`,
                }
            }
        });

        return res.status(200).json({
            message: "Data retrieved based on the search criteria.",
            data: {
                speakers,
                videos,
                audios
            }
        });
    } catch (error) {
        console.error('Error during search operation:', error);
        return res.status(500).json({
            message: "An error occurred while processing your search request. Please try again later."
        });
    }
});

// Synchronize the database connection and start the server
connection.sync().then(() => {
    app.listen(PORT, () => {
        // Log a message when the server is successfully running
        console.log(`Server is running on port ${PORT}`);
    });
});
