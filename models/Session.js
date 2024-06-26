const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ipAddress: {
        type: String,
        required: true,
        default: null // need to remove
    },
    userAgent: {
        type: String,
        required: true,
        default: null // need to remove
    },
    status: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        default: null
    },
    tokenExpiry: {
        type: Date, // Add token expiry field
    }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);