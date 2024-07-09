
const screenshotModel = require("../models/Screenshot");

const createScreenshot = async (screenshot) => {
    return await screenshotModel.create(screenshot);
}

const totalScreenshots = async (userId) => {
    let where = userId ? { user: userId } : {};
    return await screenshotModel.countDocuments(where);
}
const getScreenshots = async (userId, skip, pageSize) => {
    let where = userId ? { user: userId } : {};
    return await screenshotModel.find(where)
        .populate({
            path:'user',
            select:'username email',
        }) // Populate the user information
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .exec();
}
module.exports = {
    createScreenshot, totalScreenshots, getScreenshots
}