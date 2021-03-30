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
});

module.exports = mongoose.model('User', userSchema);