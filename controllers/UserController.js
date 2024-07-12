
const { comparePassword, hashedPassword } = require("../helper/PasswordManager");
const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { createUserSlug } = require("../helper/UserHelper");
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

const me = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await findUserById(userId);
        return successResponseMessage(res, req.translate('user.profile_response'), user)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName } = req.body;
        if (!firstName || firstName.length < 3) {
            return errorResponseMessage(res, "First Name must be at least 3 characters long");
        }
        if (!lastName || lastName.length < 3) {
            return errorResponseMessage(res, "Last Name must be at least 3 characters long");
        }
        const user = await findUserById(userId);
        const slug = await createUserSlug(user);
        // await updateUserProfile(user.profile._id, { firstName, lastName })

        const updatedProfile = await findUserById(userId);

        return successResponseMessage(res, "Email is Available!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || oldPassword.length < 6) {
            return errorResponseMessage(res, "Old Password needs to be atleast 6 characters long.");
        }
        if (!newPassword || newPassword.length < 6) {
            return errorResponseMessage(res, "New Password needs to be atleast 6 characters long.");
        }
        const user = await findUserById(req.user.id);

        const checkPassword = await comparePassword(oldPassword, user.password);
        if (!checkPassword) {
            return errorResponseMessage(res, "Incorrect Old Password", 401);
        }
        const newPass = await hashedPassword(newPassword);
        // Update the user's password
        const userUpdated = await updateUserByID(req.user.id, { password: newPass });

        return successResponseMessage(res, "Email is Available!", userUpdated);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = {
    me, getAllUsers, checkEmail,
    checkUserName, updateProfile, changePassword
}