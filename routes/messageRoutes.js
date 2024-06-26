const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware");
const { sendMessage, getMessages } = require("../controllers/messageControllers");
// import { sendMessage, getMessages } from "../controllers/messageControllers.js";
router.post("/create", auth, sendMessage);
router.post("/", auth, getMessages);

module.exports = router;
