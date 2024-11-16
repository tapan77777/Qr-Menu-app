const multer = require('multer');
const path = require('path');

// Set up multer to handle image file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where the images will be stored temporarily
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Ensure unique filenames
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

