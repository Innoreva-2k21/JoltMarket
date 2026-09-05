require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Shared Cloudinary configuration (used by multer storage and image cleanup)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
