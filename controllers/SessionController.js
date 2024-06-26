
const { errorResponseMessage, paginationResponseMessage } = require("../helper/responseMessage");
const { getSessions, totalSessions } = require("../services/SessionServices");

const getAllSessions = async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 10;

    const skip = (page - 1) * pageSize;
    try {
        const totalItems = await totalSessions();
        const users = await getSessions(skip, pageSize);
        const sessionData = {
            status: true,
            message: "User Login Sessions!",
            data: users,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
        }
        return paginationResponseMessage(res, sessionData);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = { getAllSessions }