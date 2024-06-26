const categoryModel = require("../models/Category");

const createCategory = async (category) => {
    return await categoryModel.create(category);
}
const getAllCategory = async (skip, pageSize, type) => {
    const filter = type ? { type } : {};  // Add filter conditionally
    return await categoryModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .exec()
};
const totalCategories = async (type) => {
    const filter = type ? { type } : {};  // Add filter conditionally
    return await categoryModel.countDocuments(filter);
}
module.exports = {
    createCategory, getAllCategory,
    totalCategories
}