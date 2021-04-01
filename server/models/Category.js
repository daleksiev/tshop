const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image Url is required!'],
        validate: {
            validator: (value) => /^https?:\/\/(.*)/.test(value),
            message: ({ value }) => `${value} is not a valid url address!`,
        },
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }]
});

module.exports = mongoose.model('Category', categorySchema);