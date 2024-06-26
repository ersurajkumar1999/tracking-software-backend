const { me, updateProfile, changePassword } = require("../controllers/CommonController");
const { auth } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/profile", auth, me);
router.post('/update-profile', auth, updateProfile);
router.post('/change-password',auth, changePassword);

module.exports = router;