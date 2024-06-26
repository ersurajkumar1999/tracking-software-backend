const router = require("express").Router();
const { fetchAllChats, create } = require("../controllers/ChatController");
const { auth } = require("../middlewares/authMiddleware");
// const { searchUsers, fetchAllChats } = require("../controllers/ChatController");

// router.post('/search-users', auth, searchUsers);
router.post('/chats',auth, fetchAllChats);
router.post('/chat/create',auth, create);

// router.post('/search-users', auth, searchUsers);
// router.post('/fetch-all-chats', auth, fetchAllChats);


module.exports = router;