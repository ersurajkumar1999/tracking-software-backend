const subCategoryModel = require("../models/SubCategory");

const createSubCategory = async (subCategory) => {
    return await subCategoryModel.create(subCategory);
}
const getAllSubCategory = async (skip, pageSize) => {
    return await subCategoryModel.find()
        .populate({
            path: "category",
            select: "name type createdAt updatedAt"
        })
        .select("name createdAt updatedAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .exec() // Populate the 'country' field with only the 'name' property
};
const totalSubCategories = async () => {
    return await subCategoryModel.countDocuments();
}
module.exports = {
    createSubCategory, getAllSubCategory,
    totalSubCategories
}