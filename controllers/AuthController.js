const validator = require('validator');
const jwt = require("jsonwebtoken");
const useragent = require('useragent');
const { hashedPassword, comparePassword } = require("../helper/PasswordManager");
const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { findUserByEmail, createUser, generateAccountNumber, generateOTP, findUserByUserName, createDummyUser } = require("../services/userServices");
const { createProfile } = require('../services/profileServices');
const { validateLogin } = require('../validations/Login');
const { createSession } = require('../services/SessionServices');
const { sendMail } = require('../helper/emailServices');
const verify = require('../utilities/verify-token');
const slugify = require('slugify');

const doLogin = async (req, res) => {
    try {
        // Form validation
        const { email, password } = req.body;
        const { errors, isValid } = await validateLogin(req.body);
        if (!isValid) {
            return successResponseMessage(res, "Validation Error", errors);
        }
        // return successResponseMessage(res, "Login successfully!1111111111", res1);
        // return sendMail(req, res);
        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }
        if (!password || password.length < 6) {
            return errorResponseMessage(res, "Password needs to be atleast 6 characters long.");
        }

        const checkUserExists = await findUserByEmail(email);
        if (!checkUserExists) {
            return errorResponseMessage(res, "User is not registered, Please signup first!", 401);
        }
        const checkPassword = await comparePassword(password, checkUserExists.password);
        if (!checkPassword) {
            return errorResponseMessage(res, "Incorrect Password", 401);
        }
        const token = jwt.sign(
            {
                email: checkUserExists.email,
                id: checkUserExists._id,
                userType: checkUserExists.userType
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        checkUserExists.token = "Bearer " + token;

        const tokenExpiry = new Date();
        tokenExpiry.setDate(tokenExpiry.getDate() + 7); // Set expiry date to 7 days from now

        const agent = useragent.parse(req.headers['user-agent']);

        const session = await createSession({
            user: checkUserExists._id,
            ipAddress: req.ip,
            userAgent: agent.toString(),
            token: checkUserExists.token,
            tokenExpiry: tokenExpiry
        })
        return successResponseMessage(res, "Login successfully!", checkUserExists);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }

}

const doSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || firstName.length < 3) {
            return errorResponseMessage(res, "First Name must be at least 3 characters long");
        }
        if (!lastName || lastName.length < 3) {
            return errorResponseMessage(res, "Last Name must be at least 3 characters long");
        }
        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }
        if (!password || password.length < 6) {
            return errorResponseMessage(res, "Password needs to be atleast 6 characters long.");
        }
        const checkUserExistsByEmail = await findUserByEmail(email);
        if (checkUserExistsByEmail) {
            return errorResponseMessage(res, "User email already exists");
        }

        let parts = email.split('@');
        let username = parts[0];

        const checkUserExistBYUserName = await findUserByUserName(username);
        if (checkUserExistBYUserName) {
            return errorResponseMessage(res, "User UserName already exists");
        }
        const pass = await hashedPassword(password);

        const accountNumber = await generateAccountNumber();

        const safeString = (str) => str ? str.toString() : '';

        // Create the slug with safe string handling
        const slug = slugify(`${safeString(firstName)}-${safeString(lastName)}-${safeString(accountNumber)}`, {
            lower: true,
            strict: true
        });

        const profile = await createProfile({ firstName, lastName, slug });
        const otp = await generateOTP();

        const user = await createUser({
            username,
            email,
            password: pass,
            accountNumber,
            otp,
            profile: profile._id,
        })
        return successResponseMessage(res, "User get successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const doLogout = async (req, res) => {

    try {
        const userId = req.user.id;
        const jwtToken = verify(req);
        return successResponseMessage(res, "Logout successfully!");
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }

}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }
        const checkUserExists = await findUserByEmail(email);
        if (!checkUserExists) {
            return errorResponseMessage(res, "User is not registered, Please signup first!", 401);
        }
        if (!checkUserExists.isEmailVerified) {
            return errorResponseMessage(res, "Email is not verified!", 401);
        }
        const emailSend = await sendMail();
        return successResponseMessage(res, "Email send", emailSend);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const emailVerification = async (req, res) => {
    try {
        const { email } = req.body;
        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, req.translate('validation.email_required'));
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, req.translate('validation.invalid_email'));
        }
        const checkUserExists = await findUserByEmail(email);
        if (!checkUserExists) {
            return errorResponseMessage(res, "Email is not registered!", 401);
        }
        const otp = await generateOTP();
        // Create the email body
        const html = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                    <div style="text-align: center; padding: 10px 0;">
                        <img src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png" alt="Company Logo" style="width: 150px;"/>
                    </div>
                    <h2 style="text-align: center; color: #333;">${req.translate('verification.email_subject')}</h2>
                    <p style="font-size: 16px; color: #333;">
                        ${req.translate('greetings.hello')} <strong>${checkUserExists.username}</strong>,
                    </p>
                    <p style="font-size: 16px; color: #333;">
                        ${req.translate('verification.otp_message')}
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <h3 style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; border-radius: 5px;">${otp}</h3>
                    </div>
                    <p style="font-size: 16px; color: #333;">
                        ${req.translate('verification.follow_up_message')}
                    </p>
                    <p style="font-size: 16px; color: #333;">
                        ${req.translate('verification.regards')},<br/>
                        <strong>${req.translate('verification.company_name')}</strong>
                    </p>
                    <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;"/>
                    <p style="font-size: 12px; color: #777; text-align: center;">
                        ${req.translate('verification.disclaimer')}
                    </p>
                    </div>
                    `;

        const data = {
            subject: `${req.translate('verification.email_subject')}`,
            email: "spandev23@gmail.com",
            body: html
        };
        const emailSend = await sendMail(data);
        return successResponseMessage(res, "Email send", emailSend);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}


const createDummyUsers = async (req, res) => {
    try {
        const numUsers = 100;
        const users = [];
        for (let i = 0; i < numUsers; i++) {
            const user = await createDummyUser();
            users.push(user);
        }

        // Return success response with the array of created users
        return successResponseMessage(res, "Dummy users created successfully!", users);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}


module.exports = {
    doLogin, doSignUp, doLogout,
    forgotPassword, emailVerification,
    createDummyUsers
}


