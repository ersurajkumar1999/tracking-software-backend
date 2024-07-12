const mongoose = require('mongoose');
const activityLogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    startMemo: {
        type: String,
        required: true,
        trim: true,
    },
    endMemo: {
        type: String,
        default:null,
        trim: true,
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        default: null
    },
    status: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, });


module.exports = mongoose.model('ActivityLog', activityLogSchema);;
