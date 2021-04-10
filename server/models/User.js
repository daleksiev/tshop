const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: {
            validator: (email) => /\S+@\S+\.\S+/.test(email),
            message: ({ value }) => `${value} is not a valid email address!`
        },
    },
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
    imageUrl: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/t-shop-e1948.appspot.com/o/users%2Funnamed.png?alt=media&token=a611490a-084d-4605-a452-e6b68b08ece0',
    },
    image: {
        type: String,
        default: 'unnamed.png',
    },
    role: {
        type: String,
        default: 'user',
    }
});

module.exports = mongoose.model('User', userSchema);