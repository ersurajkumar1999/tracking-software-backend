
const { comparePassword, hashedPassword } = require("../helper/PasswordManager");
const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { updateUserProfile } = require("../services/profileServices");
const { totalUsers, getUsers, findUserByEmail, findUserByUserName, findUserById, updateUserByID } = require("../services/userServices");
const validator = require('validator');
const getAllUsers = async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 10;

    const skip = (page - 1) * pageSize;

    try {
        const totalItems = await totalUsers();
        const users = await getUsers(skip, pageSize);
        res.json({
            data: users,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "get all users"
        });
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }
        const checkUserExistsByEmail = await findUserByEmail(email);
        if (checkUserExistsByEmail) {
            return errorResponseMessage(res, "User email already exists");
        }
        return successResponseMessage(res, "Email is Available!");
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const checkUserName = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username || username.length < 3) {
            return errorResponseMessage(res, "username needs to be atleast 3 characters long.");
        }
        const checkUserExistsByUserName = await findUserByUserName(username);
        if (checkUserExistsByUserName) {
            return errorResponseMessage(res, "User UserName already exists");
        }
        return successResponseMessage(res, "UserName is Available!");
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}



module.exports = {
    getAllUsers, checkEmail,
    checkUserName,
}