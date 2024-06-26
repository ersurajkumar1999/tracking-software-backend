const express = require('express');
const { auth } = require('../middlewares/authMiddleware');
const { add } = require('../controllers/BreakController');
const router = express.Router();

router.post('/add', auth, add);

module.exports = router;