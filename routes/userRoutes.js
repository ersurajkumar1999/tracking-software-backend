const router = require("express").Router();
const { forgotPassword, emailVerification } = require("../controllers/Auth/AuthController");
const { getAllUsers, checkEmail, checkUserName, changePassword, me, updateProfile } = require("../controllers/UserController");
const { auth } = require("../middlewares/authMiddleware");

router.post('/users', getAllUsers);
router.post('/check-email', checkEmail);
router.post('/check-username', checkUserName);
router.post('/me', auth, me);
router.post('/change-password', auth, changePassword);
router.post('/update-profile', auth, updateProfile);
router.post('/forgot-password', forgotPassword);
router.post('/email-verification', emailVerification);

// router.get('/get-user-by-id/:id', auth, isAdmin, getUserById);
// router.delete('/delete-user/:id', auth, isAdmin, deleteUser);
// router.put('/update-user/:id', auth, isAdmin, updateUser);
// router.post('/profile', auth, getProfile);
// router.post('/update-profile', auth, updateProfile);
// router.post('/update-social-media', auth, updateSocialMedia);
// router.post('/create-dummy-users', createDummyUsers);
module.exports = router;