const cloudinary = require('../config/cloudinaryConfig');
const MenuItem = require('../models/MenuItem');

// Get all menu items
exports.getAllItems = async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create a new menu item with image upload to Cloudinary
exports.createItem = async (req, res) => {
    const { name, price, category, description } = req.body;
    const image = req.file;  // Get the uploaded image

    
    // Ensure an image was uploaded
    if (!image) {
        return res.status(400).json({ message: "Image is required" });
    }

    // Validate image file type (only allowing images)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validImageTypes.includes(image.mimetype)) {
        return res.status(400).json({ message: "Invalid image type. Only JPG, PNG, and JPEG are allowed." });
    }

    try {
        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(image.path, {
            folder: 'digital-menu'  // Folder name in Cloudinary
        });

        // Create the new menu item with the image URL from Cloudinary
        const newItem = new MenuItem({
            name,
            price,
            category,
            description,
            imageURL: uploadResult.secure_url  // Get the image URL from Cloudinary
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a menu item with image upload to Cloudinary
// Update a menu item with image upload to Cloudinary
exports.updateItem = async (req, res) => {
    const { name, price, category, description } = req.body;
    const image = req.file;  // Get the uploaded image (if any)

    try {
        let updateData = { name, price, category, description };

        // If a new image is uploaded, upload it to Cloudinary and update the image URL
        if (image) {
            // Validate image type
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validImageTypes.includes(image.mimetype)) {
                return res.status(400).json({ message: "Invalid image type. Only JPG, PNG, and JPEG are allowed." });
            }

            const uploadResult = await cloudinary.uploader.upload(image.path, {
                folder: 'digital-menu'
            });
            updateData.imageURL = uploadResult.secure_url;
        }

        // Update the menu item with the new data
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a menu item
exports.deleteItem = async (req, res) => {
    try {
        // Find the item first
        const itemToDelete = await MenuItem.findById(req.params.id);
        if (!itemToDelete) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Delete the image from Cloudinary if the item has one
        if (itemToDelete.imageURL) {
            const publicId = itemToDelete.imageURL.split('/').pop().split('.')[0]; // Extract public_id from the URL
            await cloudinary.uploader.destroy(publicId);  // Delete the image from Cloudinary
        }

        // Now delete the item from the database
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
