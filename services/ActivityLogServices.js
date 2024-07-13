const activityLog = require('../models/ActivityLog');

const createActivityLog = async (log) => {
    return await activityLog.create(log);
};

const getLastActivityLog = async (userId) => {
    return await activityLog.findOne({ user: userId, endTime: null }).sort({ createdAt: -1 });
};
const getAllStates = async (skip, pageSize) => {
    return await activityLog.find().sort({ createdAt: -1 }).populate('country', 'name')
        .skip(skip)
        .limit(pageSize)
        .exec() // Populate the 'country' field with only the 'name' property
};

const updateActivityLog = async (activityLogId, logData) => {
    return await activityLog.findOneAndUpdate(
        { _id: activityLogId },
        { $set: logData, updatedAt: new Date() },
        { new: true, upsert: true }
    );
}
const findActivityLogById = async (Id) => {
    return await activityLog.findOne({ _id: Id }).sort({ createdAt: -1 });
};

const updateStateById = async (stateId, updatedData) => {
    return await activityLog.findByIdAndUpdate(stateId, updatedData, { new: true });
};

const deleteStateById = async (stateId) => {
    return await activityLog.findByIdAndDelete(stateId);
};
const totalState = async () => {
    return await activityLog.countDocuments()
};

const totalScreenshots = async (userId) => {
    let where = userId ? { user: userId } : {};
    return await activityLog.countDocuments(where);
}

const getScreenshots = async (userId, skip, pageSize) => {
    let where = userId ? { user: userId } : {};
    return await activityLog.find(where)
        .populate({
            path: 'user',
            select: 'username email',
        }) // Populate the user information
        .populate({
            path: 'screenshots',
            // select:'username email',
        }) // Populate the user information
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .exec();
}

module.exports = {
    createActivityLog,
    findActivityLogById,
    getAllStates,
    updateActivityLog,
    getLastActivityLog,
    updateStateById,
    deleteStateById,
    totalState,
    getScreenshots,
    totalScreenshots
};