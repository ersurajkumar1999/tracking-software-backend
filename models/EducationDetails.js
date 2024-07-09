// models/EducationDetails.js

const EducationDetailsSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
        trim: true,
    },
    degree: {
        type: String,
        required: true,
        trim: true,
    },
    fieldOfStudy: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    isCurrent: {
        type: Boolean,
        default: false,
    },
    endDate: {
        type: Date,
    },
    description: {
        type: String,
        trim: true,
    },
    document: {
        type: String,
        default: null,
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("EducationDetails", EducationDetailsSchema);