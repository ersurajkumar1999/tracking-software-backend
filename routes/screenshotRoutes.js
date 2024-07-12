const router = require("express").Router();

const { auth } = require("../middlewares/authMiddleware");
const { deleteScreenshot, screenshotUpload, getAllScreenshots, getLastLog, createLog } = require("../controllers/ScreenshotController");
const { upload } = require("../config/multer");

router.post("/upload", auth,  upload.single('screenshot'),  screenshotUpload);
router.delete('/:screenshotId', deleteScreenshot);
router.post('/list', auth, getAllScreenshots);
router.post('/get-log',auth, getLastLog)
router.post('/create-log',auth, createLog)
module.exports = router;

