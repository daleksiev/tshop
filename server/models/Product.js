const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imageUrl: String,
    title: String,
    brand: String,
    price: Number,
    description: String,
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]

});

module.exports = mongoose.model('Product', productSchema);