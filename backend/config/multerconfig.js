const multer = require('multer');
const path = require('path');

// Set up multer to handle image file uploads
const storage = multer.diskStorage({
    // Specify where the uploaded files will be stored temporarily
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // The folder where the images will be saved temporarily
    },
    // Ensure unique filenames by appending the timestamp to the original file name
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9); // Creates a unique suffix
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique filenames
    }
});

// Set up the multer upload configuration
const upload = multer({
    storage: storage,
    // File size limit (e.g., 5 MB max for image files)
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    // Validate file type (only image files are allowed)
    fileFilter: (req, file, cb) => {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (validImageTypes.includes(file.mimetype)) {
            cb(null, true); // Accept file
        } else {
            cb(new Error('Invalid image type. Only JPG, PNG, and JPEG are allowed.'));
        }
    }
});

module.exports = upload;
