const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg', 'drinks'],  // These are the allowed values
        required: true
    },
    description: {
        type: String,
        default: 'No description available',  // Add a default description if not provided
    },
    
    imageURL: String
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
