// models/UserExperience.js

const { EMPLOYEE_TYPES } = require("../helper/Constants");

const experienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        trim: true,
    },
    skills: {
        type: String,
        required: true,
    },
    employmentType: {
        enum: EMPLOYEE_TYPES, // Using roles from the helper file
        default: EMPLOYEE_TYPES[0], // Default role as 'User'
        required: true
    },
    locationType: {
        type: String,
        default: null
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    isCurrent: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        trim: true,
    },
    media: {
        type: String,
        trim: true,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("ExperienceDetails", experienceSchema);

