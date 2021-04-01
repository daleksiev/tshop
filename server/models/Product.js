const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    brand: {
        type: String,
        required: [true, 'Brand is required!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        validate: {
            validator: (value) => value > 0,
            message: () => `The price should be positive number!`,
        },
    },
    imageUrl: {
        type: String,
        required: [true, 'Image Url is required!'],
        validate: {
            validator: (value) => /^https?:\/\/(.*)/.test(value),
            message: ({ value }) => `${value} is not a valid url address!`,
        },
    },
    description: String,
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required!'],
    }

});

module.exports = mongoose.model('Product', productSchema);