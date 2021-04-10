const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    products: [{
        type: Object,
    }],
    price: Number,
});

module.exports = mongoose.model('Order', orderSchema);