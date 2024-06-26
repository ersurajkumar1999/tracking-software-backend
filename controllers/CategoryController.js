const { LOGIN_TYPES } = require("../helper/Constants");
const { errorResponseMessage, successResponseMessage, paginationResponseMessage } = require("../helper/responseMessage");
const { createCategory, getAllCategory, totalCategories } = require("../services/CategoryServices");
const { getUserAttendance, getAllAttendance, findAttendanceById, updateAttendanceById } = require("../services/attendanceServices");
const { totalCountries, getCountryById } = require("../services/countryServices");

const create = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, type } = req.body;
        if (!name) {
            return errorResponseMessage(res, req.translate('category.name_required'));
        }
        if (name.length < 3) {
            return errorResponseMessage(res, req.translate('category.category_name_min_length'));
        }
        const category = await createCategory({
            user: userId,
            type,
            name,
        })
        return successResponseMessage(res, req.translate('category.add'), category)
    } catch (error) {
        // Dynamic error message key based on error type
        const errorMessageKey = `comman_error.${error.name.toLowerCase()}`;
        const errorMessage = req.translate(errorMessageKey, { error: error.message });

        return errorResponseMessage(res, errorMessage);
    }
}

const list = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const { type } = req.body;

    const skip = (page - 1) * pageSize;
    try {
        const totalItems = await totalCategories(type);
        const categories = await getAllCategory(skip, pageSize, type);

        return paginationResponseMessage(res, {
            message: req.translate('category.list'),
            status: true,
            data: categories,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
        })
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const update = async (req, res) => {

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

const destroy = async (req, res) => {

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

const find = async (req, res) => {
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
    create, list,
    update, destroy,
    find
}  