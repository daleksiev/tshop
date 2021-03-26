const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imageUrl: String,
    title: String,
    brand: String,
    price: Number,
    description: String,
});

module.exports = mongoose.model('Product', productSchema);