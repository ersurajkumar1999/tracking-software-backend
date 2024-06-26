const userProfile = require("../models/Profile")
const createProfile = async (profile) => {
    return await userProfile.create(profile);
}
const updateUserProfile = async (profileId, profileData) => {
    return await userProfile.findOneAndUpdate(
        { _id: profileId },
        { $set: profileData, updatedAt: new Date() },
        { new: true, upsert: true }
    );
}

module.exports = { createProfile, updateUserProfile }