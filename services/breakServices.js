const breakModel = require("../models/Break");

const createBreak = async(breakData) => {
    return await breakModel.create(breakData);
}

module.exports = {
    createBreak
}