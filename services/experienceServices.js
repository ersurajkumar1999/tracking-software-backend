const experience = require("../models/Experience");

const createExperience = async (experience) => {
    return await experience.create(experience);
}
const getAllExperience = async (skip, pageSize) => {
    return await experience.find()
        // .populate({
        //     path: "category",
        //     select: "name type createdAt updatedAt"
        // })
        // .select("name createdAt updatedAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .exec() // Populate the 'country' field with only the 'name' property
};
const totalExperience = async () => {
    return await experience.countDocuments();
}
module.exports = {
    createExperience, getAllExperience,
    totalExperience
}