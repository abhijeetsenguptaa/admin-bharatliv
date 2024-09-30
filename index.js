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
app.use('/api/audio-categories', audioCategoryRoutes);
app.use('/api/audio-sub-categories', audioSubCategoryRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/document', documentRoutes);
app.use('/api/organizations', organizationRoute);
app.use('/api/speakers', speakerRoutes);
app.use('/api/languages', languageRoute);
app.use('/api/banners', bannerRoutes);
app.use('/api/reels', reelsRoutes);


// Synchronize the database connection and start the server
connection.sync().then(() => {
    app.listen(PORT, () => {
        // Log a message when the server is successfully running
        console.log(`Server is running on port ${PORT}`);
    });
});
