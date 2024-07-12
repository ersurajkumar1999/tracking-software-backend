const slugify = require('slugify');

const safeString = (str) => str ? str.toString() : '';

const createUserSlug = async (userInfo) => {
    // Create the slug with safe string handling
    const slug = slugify(`${safeString(userInfo.profile.firstName)}-${safeString(userInfo.profile.lastName)}-${safeString(userInfo.accountNumber)}`, {
        lower: true,
        strict: true
    });
    return slug;
}

module.exports = {
    createUserSlug,
}