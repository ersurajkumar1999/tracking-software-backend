const mongoose = require('mongoose');
const { LOGIN_TYPES, ATTENDANCE_TYPES } = require('../helper/Constants');

const attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    status: {
        type: String,
        enum: ATTENDANCE_TYPES,
        default: ATTENDANCE_TYPES[0],
    },
    type: {
        type: String,
        enum: LOGIN_TYPES,
        default: null,
    },
    checkInTime: {
        type: Date,
        default: Date.now
    },
    checkOutTime: {
        type: Date,
        default: null
    },
    time: {
        hours: {
            type: Number,
            default: 0
        },
        minutes: {
            type: Number,
            default: 0
        },
        seconds: {
            type: Number,
            default: 0
        }
    },
    comments: {
        type: String,
        default: null,
        trim: true
    },
    breaks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Break'
    }],
    isWFH: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
