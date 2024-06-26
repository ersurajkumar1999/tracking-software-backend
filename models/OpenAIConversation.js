const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const USER_TYPES = ["USER", "BOT"];
const conversationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    entries: [{
        role: {
            type: String,
            enum: USER_TYPES,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
