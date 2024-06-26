const { LOGIN_TYPES } = require("../helper/Constants");
const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { createAttendance, getUserAttendance, getAllAttendance, findAttendanceById, updateAttendanceById } = require("../services/attendanceServices");
const { totalCountries, getCountryById } = require("../services/countryServices");

const create = async (req, res) => {
    try {
        const userId = req.user.id;
        const { type, comments } = req.body;
        const attendance = await createAttendance({
            user: userId,
            type,
            comments,
        })
        return successResponseMessage(res, "Attendance login successfully!", attendance)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const logout = async (req, res) => {
    try {
        const userId = req.user.id;
        const { comments, attendanceId } = req.body;
        if (!attendanceId) {
            return errorResponseMessage(res, "attendanceId field is required");
        }

        const attendance = await findAttendanceById(attendanceId);
        if (!attendance) {
            return errorResponseMessage(res, "Invalid attendance Id");
        }
        if (attendance.checkOutTime) {
            return errorResponseMessage(res, "You are already Logout!");
        }

        const checkInTime = attendance.checkInTime;
        if (!checkInTime) {
            return errorResponseMessage(res, "Check-in time not found for this attendance record.");
        }

        const checkOutTime = new Date();
        const diffInMilliseconds = checkOutTime - checkInTime;
        const totalSeconds = Math.floor(diffInMilliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const totalTime = { hours, minutes, seconds };

        const data = {
            user: userId,
            type: LOGIN_TYPES[1],
            comments,
            time: totalTime,
            checkOutTime
        }
        const attendanceUpdate = await updateAttendanceById(attendanceId, data)

        return successResponseMessage(res, "Attendance logout successfully!", attendanceUpdate)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const getAttendance = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    const skip = (page - 1) * pageSize;
    try {
        const totalItems = await totalCountries();
        const countries = await getUserAttendance(skip, pageSize);
        res.json({
            countries,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "Get all countries!"
        });
    } catch (err) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const getAllUserAttendance = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    const skip = (page - 1) * pageSize;
    try {
        const totalItems = await totalCountries();
        const countries = await getAllAttendance(skip, pageSize);
        res.json({
            countries,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "Get all countries!"
        });
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const findCountry = async (req, res) => {
    try {
        if (!req.params.id) {
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const user = await getCountryById(req.params.id);
        return successResponseMessage(res, "Country get successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = {
    create, logout,
    getAttendance,
    findCountry, getAllUserAttendance
}  