const { hashedPassword } = require("../helper/PasswordManager");
const userModel = require("../models/User");
const { createProfile } = require("./profileServices");

const createUser = async (user) => {
    return await userModel.create(user);
}
const findUserByEmail = async (email) => {
    return await userModel.findOne({ email: email });
}
const findUserByUserName = async (username) => {
    return await userModel.findOne({ username: username });
}
const findUserById = async (userId) => {
    return await userModel.findOne({ _id: userId })
        .select('-password')
        .populate('profile');
}
const deleteUserById = async (userId) => {
    return await userModel.deleteOne({ _id: userId });
}
const updateUserByID = async (userId, updatedUserData) => {
    return await userModel.findOneAndUpdate({ _id: userId }, { $set: updatedUserData }, { new: true });
}
const totalUsers = async () => {
    return await userModel.countDocuments({ userType: "User" });
}
const getUsers = async (skip, pageSize, loggedInUserId) => {
    return await userModel.find({ userType: "User", _id: { $ne: loggedInUserId } })
        .populate('profile')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .exec();
}
const generateAccountNumber = async () => {
    const accountNumber = Math.floor(100000000000 + Math.random() * 900000000000);
    const existingUser = await userModel.findOne({ accountNumber });
    if (existingUser) {
        return generateAccountNumber();
    }
    return accountNumber;
}

// Function to generate a random 6-digit number
const generateOTP = () => {
    // Generate a random number between 100000 and 999999 (inclusive)
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
};
const generateRandomEmail = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';

    // Generate a random string for the local part of the email
    for (let i = 0; i < 10; i++) {
        email += chars[Math.floor(Math.random() * chars.length)];
    }

    // List of common email domains
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];

    // Choose a random domain from the list
    const domain = domains[Math.floor(Math.random() * domains.length)];

    // Concatenate the local part and the domain to form the email address
    return email + '@' + domain;
}
const createDummyUser = async () => {
    const email = generateRandomEmail();
    const parts = email.split('@');
    const username = parts[0];
    const checkUserExists = await findUserByEmail(email);
    if (checkUserExists) {
        // If user already exists with this email, return or handle accordingly
        console.log("User email already exists");
        return null;
    }
    const pass = await hashedPassword('password'); // Hash the password
    const profile = await createProfile({ firstName: username, lastName: username }); // Generate a random profile
    const accountNumber = await generateAccountNumber(); // Generate a random account number
    const userInfo = {
        email,
        username,
        password: pass,
        profile: profile._id,
        accountNumber
    }
    const user = await createUser(userInfo); // Create the user
    // console.log("Dummy user created:", user);
    return user;
}
module.exports = {
    createUser,
    findUserByEmail,
    findUserByUserName,
    findUserById,
    deleteUserById,
    updateUserByID,
    totalUsers,
    getUsers,
    generateAccountNumber,
    generateOTP,
    createDummyUser
}