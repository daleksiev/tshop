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
        default: 'https://firebasestorage.googleapis.com/v0/b/t-shop-e1948.appspot.com/o/users%2Funnamed.png?alt=media&token=74155150-7f47-4efc-a4a3-694d982e25ca',
    },
    image: {
        type: String,
        default: 'unnamed.png',
    }
});

module.exports = mongoose.model('User', userSchema);