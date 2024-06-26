const router = require("express").Router();
const { getAllSessions } = require("../controllers/SessionController");

router.get('/sessions', getAllSessions);
// router.post('/users', getAllUsers);
// router.get('/get-user-by-id/:id', auth, isAdmin, getUserById);
// router.delete('/delete-user/:id', auth, isAdmin, deleteUser);
// router.put('/update-user/:id', auth, isAdmin, updateUser);
// router.post('/profile', auth, getProfile);
// router.post('/update-profile', auth, updateProfile);
// router.post('/update-social-media', auth, updateSocialMedia);
// router.post('/create-dummy-users', createDummyUsers);
module.exports = router;