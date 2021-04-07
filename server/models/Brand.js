const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand name is required!'],
    },
    imageUrl: {
        type: String,
        validate: {
            validator: (value) => /^https?:\/\/(.*)/.test(value),
            message: ({ value }) => `${value} is not a valid url address!`,
        },
    },
    image: String,
    visibility: {
        type: String,
        default: true,
    }
});

module.exports = mongoose.model('Brand', brandSchema);