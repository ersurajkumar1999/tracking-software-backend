const router = require("express").Router();

const { auth } = require("../middlewares/authMiddleware");
const { getPosts, create, getPostById } = require("../controllers/PostController");
const { upload } = require("../config/multer");

router.post('/list', auth, getPosts);
router.post("/create", auth, upload.single('images'), create);
router.get("/:postId", auth, getPostById);
// router.delete('/:postId', deleteScreenshot);
module.exports = router;

