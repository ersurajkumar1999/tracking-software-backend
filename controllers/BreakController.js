const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { findAttendanceById } = require("../services/attendanceServices");
const { createBreak } = require("../services/breakServices");

const add = async (req, res) => {
    try {
        const { attendanceId, breakType, comment } = req.body;

        if (!attendanceId) {
            return errorResponseMessage(res, "AttendanceId field is required");
        }

        const attendance = await findAttendanceById(attendanceId);
        if (!attendance) {
            return errorResponseMessage(res, "Invalid attendance Id");
        }
        const breakData = await createBreak({
            attendance: attendanceId,
            breakType,
            comment
        })

        // Add the break ID to the attendance's breaks array
        attendance.breaks.push(breakData._id);
        await attendance.save();

        return successResponseMessage(res, "Break Added successfully!", breakData)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = {
    add
}  