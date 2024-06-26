const mongoose = require('mongoose');

const leaveTypes = ['SICK', 'CASUAL', 'PAID'];
const statuss = ['PENDING', 'APPROVED', 'REJECTED'];

const leaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    leaveType: {
        type: String,
        enum: leaveTypes,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: statuss,
        default: statuss[0]
    },
    comment: {
        type: String,
        trim: true
    },
    documents: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
