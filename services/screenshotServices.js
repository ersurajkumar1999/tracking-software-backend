
const screenshotModel = require("../models/Screenshot");

const createScreenshot = async (screenshot) => {
    return await screenshotModel.create(screenshot);
}
module.exports = {
    createScreenshot
}