const Validator = require('validator');
const isEmpty = require('is-empty');

const validateLogin = async (data) => {
    let errors = {};
    try {
        // Converts empty fields to String in order to validate them
        data.email = !isEmpty(data.email) ? data.email : '';
        data.password = !isEmpty(data.password) ? data.password : '';
        // console.log("validateLogin data", data);
        if (Validator.isEmpty(data.email)) {
            errors.email = 'Email field is required';
        }
        if (Validator.isEmpty(data.password)) {
            errors.password = 'Password field is required';
        }
        if (data.password.length < 6) {
            errors.password = "Password needs to be atleast 6 characters long.";
        }
        return {
            errors,
            isValid: isEmpty(errors),
        };
    } catch (error) {
        console.log("error", error);
    }
}
module.exports = { validateLogin };

// module.exports = function validateLogin(data) {
//     let errors = {};

//     // Converts empty fields to String in order to validate them
//     data.username = !isEmpty(data.username) ? data.username : '';
//     data.password = !isEmpty(data.password) ? data.password : '';

//     if (Validator.isEmpty(data.username)) {
//         errors.username = 'Username field is required';
//     }

//     if (Validator.isEmpty(data.password)) {
//         errors.password = 'Password field is required';
//     }
//     return {
//         errors,
//         isValid: isEmpty(errors),
//     };
// };