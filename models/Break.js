const mongoose = require('mongoose');
const { breakTypes } = require('../helper/Constants');

const breakSchema = new mongoose.Schema({
    attendance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance',
    },
    breakType: {
        type: String,
        enum: breakTypes,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now //// This sets the default value to the current date and time
    },
    comment: {
        type: String,
        trim: true
    },
}, { timestamps: true });
module.exports = mongoose.model('Break', breakSchema);