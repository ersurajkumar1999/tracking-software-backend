const { doLogin, doSignUp, doLogout } = require("../controllers/AuthController");
const { auth } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/login", doLogin);
router.post("/signup", doSignUp);
router.post("/logout", auth, doLogout)
// router.post('/create-dummy-users', createDummyUsers);

module.exports = router;