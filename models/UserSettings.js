const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSettingsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timezone: {
        type: String
    },
    language: { type: String },
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: false },
    twoFactorEnabled: {
        type: Boolean,
        default: false
    },
    twoFactorSecret: {
        type: String
    },
    securityQuestions: [{
        question: { type: String },
        answer: { type: String }
    }]
}, { timestamps: true });

const UserSettings = mongoose.model('UserSettings', userSettingsSchema);

module.exports = UserSettings;
