const sessionModel = require("../models/Session");

const createSession = async (user) => {
    return await sessionModel.create(user);
}
const getSessions = async (skip, pageSize, loggedInUserId = null) => {
    // return await sessionModel.find({ userId: { $ne: loggedInUserId } })
    return await sessionModel.find()
        .populate({
            path: 'user',
            select: 'username email profile',
            populate: {
                path: 'profile',
                select: 'firstName lastName contactNumber image'
            }
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .exec();
}
const totalSessions = async () => {
    return await sessionModel.countDocuments();
    // return await sessionModel.countDocuments({ userId });
}
module.exports = {
    createSession,
    getSessions,
    totalSessions
}