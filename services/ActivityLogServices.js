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

const updateStateById = async (stateId, updatedData) => {
    return await activityLog.findByIdAndUpdate(stateId, updatedData, { new: true });
};

const deleteStateById = async (stateId) => {
    return await activityLog.findByIdAndDelete(stateId);
};
const totalState = async () => {
    return await activityLog.countDocuments()
};

module.exports = {
    createActivityLog,
    getAllStates,
    updateActivityLog,
    getLastActivityLog,
    updateStateById,
    deleteStateById,
    totalState
};
