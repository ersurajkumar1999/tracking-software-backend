const mongoose = require('mongoose');
const screenshotSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activityLog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActivityLog',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        default: 0
    },
    memo: {
        type: String,
        default: null
    },
    assetId: {
        type: String,
        required: true
    },
    activityLevel: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });
module.exports = mongoose.model("Screenshot", screenshotSchema);