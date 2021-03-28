const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    firebaseId: String,
    accessToken: String,
    refreshToken: String,
    bought: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
});

module.exports = mongoose.model('User', userSchema);