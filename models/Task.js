const { TASK_STATUS } = require("../helper/Constants");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: TASK_STATUS,
        default: TASK_STATUS[0]
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: {
        type: Date,
        required: true
    },
    isOverdue: {
        type: Boolean,
        default: false
    },
    completedDate: {
        type: Date
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskReport'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
