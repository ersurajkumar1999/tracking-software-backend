const router = require("express").Router();

const { auth } = require("../middlewares/authMiddleware");
const { deleteScreenshot, screenshotUpload } = require("../controllers/ScreenshotController");
const { upload } = require("../utilities/multer");

router.post("/upload", auth,  upload.single('screenshot'),  screenshotUpload);
router.delete('/:screenshotId', deleteScreenshot);
module.exports = router;

