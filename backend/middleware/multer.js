const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Specify the folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Specify allowed formats
        filename: (req, file) => {
            return Date.now() + '-' + file.originalname; // Unique filename
        }
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 4 * 1024 * 1024 }, // 4 MB (under Vercel's 4.5 MB serverless body limit)
});

module.exports = upload;
