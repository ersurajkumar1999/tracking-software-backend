const express = require('express');
const { auth } = require('../middlewares/authMiddleware');
const { list, update, destroy, find, create } = require('../controllers/ExperienceController');
const router = express.Router();

router.post('/create', auth, create);
router.get('/list', auth, list);
router.post('/update', auth, update);
router.post('delete', auth, destroy);

module.exports = router;