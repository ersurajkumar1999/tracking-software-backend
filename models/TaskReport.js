const mongoose = require('mongoose');
const { ROLES } = require('../helper/rolesHelper');
const { TASK_STATUS } = require('../helper/Constants');

const TaskReportSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER, // Default role as 'User'
    },
    reportDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    progress: {
        type: String,
        required: true,
        trim: true
    },
    hoursWorked: {
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
    status: {
        type: String,
        enum: TASK_STATUS,
        default: TASK_STATUS[0]
    },
}, { timestamps: true });

module.exports = mongoose.model('TaskReport', TaskReportSchema);
