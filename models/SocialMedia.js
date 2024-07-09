const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    whatsapp: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    threads: { type: String },
    linkedin: { type: String },
    github: { type: String },
    youtube: { type: String },
    snapchat: { type: String },
    pinterest: { type: String },
    reddit: { type: String },
    telegram: { type: String },
    wechat: { type: String },
    tiktok: { type: String },
    stackoverflow: { type: String },
    medium: { type: String },
    vimeo: { type: String },
    dribbble: { type: String },
    behance: { type: String },
    soundcloud: { type: String },
    twitch: { type: String },
    flickr: { type: String },
    tumblr: { type: String },
    clubhouse: { type: String },
    goodreads: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("SocialMedia", socialMediaSchema);
