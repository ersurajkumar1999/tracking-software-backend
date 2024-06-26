const mongoose = require('mongoose');
const employmentTypes = ['FULL-TIME', 'PART-TIME', 'SELF-EMPLOYED', 'FREELANCE', 'INTERNSHIP', 'TRAINEE'];
const LocationTypes = ['ON-SITE', 'HYBRID', 'REMOTE'];

const experienceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        enum: employmentTypes,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    LocationType: {
        type: String,
        enum: LocationTypes,
        required: true
    },
    isWorking: {
        type: String,
        required: false
    },
    fromMonth: {
        type: Date,
        required: true
    },
    fromYear: {
        type: Date,
        required: true
    },
    toMonth: {
        type: Date,
        required: true
    },
    toYear: {
        type: Date,
        required: true
    },
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill',
        }
    ],
    description: {
        type: String
    },
    document: {
        type: String,
        default: null,
    }
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
