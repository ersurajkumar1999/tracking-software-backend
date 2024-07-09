const mongoose = require("mongoose");
const { getAllGenders } = require("../helper/GenderHelper");

const Schema = mongoose.Schema;
const skillSchema = new Schema({
    skillId: {
        type: Schema.Types.ObjectId,  // Example: MongoDB ObjectId or any unique identifier for skills
        ref: 'Skill',  // Reference to a Skills collection or schema
        required: true
    },
    level: {
        type: String,  // Example: Beginner, Intermediate, Advanced
        required: true
    }
});

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: null
    },
    lastName: {
        type: String,
        trim: true,
        default: null
    },
    slug: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        enum: getAllGenders, // Specify the enum here
        default: null
    },
    dateOfBirth: {
        type: String,
        trim: true,
        default: null
    },
    bio: { type: String },
    website: { type: String },
    about: {
        type: String,
        trim: true,
        default: null
    },
    contactNumber: {
        type: Number,
        trim: true,
        default: null
    },
    isNumberVerified: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        trim: true,
        default: null
    },
    bioImage: {
        type: String,
        trim: true,
        default: null
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    state: {
        type: String,
        trim: true,
        default: null
    },
    city: {
        type: String,
        trim: true,
        default: null
    },
    address1: {
        type: String,
        trim: true,
        default: null
    },
    address2: {
        type: String,
        trim: true,
        default: null
    },
    pinCode: {
        type: String,
        trim: true,
        default: null
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    isEducationPublic: {
        type: Boolean,
        default: true
    },
    isExperiencePublic: {
        type: Boolean,
        default: true
    },
    isSocialMediaPublic: {
        type: Boolean,
        default: true
    },
    isSkillsPublic: {
        type: Boolean,
        default: true
    },
    isAddresPublic: {
        type: Boolean,
        default: true
    },
    hobbies: [{ type: String }],
    skills: [skillSchema], 
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);