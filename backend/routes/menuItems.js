const express = require('express');
const router = express.Router();
const { getAllItems, createItem, updateItem, deleteItem } = require('../controllers/menuItemsController');
const upload = require('../config/multerConfig');  // Import the multer config
const validateRequestTime = require('../middleware/timeValidationMiddleware');  // Import the time validation middleware

// Get all menu item
router.get('/', getAllItems);  // Make sure 'getAllItems' is a valid function

// Create a new menu item with an image upload and time validation
router.post('/', validateRequestTime, upload.single('image'), createItem);  // Apply multer and time validation middleware here

// Update a menu item by ID with an image upload and time validation
router.put('/:id', validateRequestTime, upload.single('image'), updateItem);  // Apply multer and time validation middleware here

// Delete a menu item by ID with time validation
router.delete('/:id', validateRequestTime, deleteItem);  // Ensure 'deleteItem' is a valid function

module.exports = router;
