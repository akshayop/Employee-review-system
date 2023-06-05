const mongoose = require('mongoose');

// It is a schema for the User and it contains the user's basic informations

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    userToReview: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    reviewsFromOthers: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Review'
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;