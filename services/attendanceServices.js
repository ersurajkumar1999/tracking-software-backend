const attendanceModel = require("../models/Attendance");

const createAttendance = async (attendance) => {
    return await attendanceModel.create(attendance);
}
const getUserAttendance = async (skip, pageSize, loggedInUserId) => {
    try {
        return await attendanceModel.find({ user: { $ne: loggedInUserId } })
            // .populate('user', 'profile')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .exec();
    } catch (error) {
        throw new Error('Error retrieving attendance records: ' + error.message);
    }
}
const getAllAttendance = async (skip, pageSize) => {
    try {
        return await attendanceModel.find()
            .populate({
                path: 'user',
                select: 'username email profile',
                populate: {
                    path: 'profile',
                    select: 'firstName lastName contactNumber image'
                }
            })
            .populate('breaks')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .exec();
    } catch (error) {
        throw new Error('Error retrieving attendance records: ' + error.message);
    }
}
const findAttendanceById = async (attendanceId) => {
    return await attendanceModel.findOne({ _id: attendanceId });
}
const updateAttendanceById = async (attendanceId, updatedAttendanceData) => {
    return await attendanceModel.findOneAndUpdate({ _id: attendanceId }, { $set: updatedAttendanceData }, { new: true });
}
module.exports = {
    createAttendance, getUserAttendance,
    getAllAttendance, findAttendanceById, updateAttendanceById
}