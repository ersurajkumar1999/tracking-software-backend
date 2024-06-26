const express = require('express');
const { auth, isAdmin, isUser } = require('../middlewares/authMiddleware');
const { list, update, destroy, find, create } = require('../controllers/CategoryController');
const router = express.Router();

router.post('/create', auth, create);
router.get('/list', auth, list);
router.post('/update', auth, update);
router.post('delete', auth, destroy);
router.post('/find', auth, find);

module.exports = router;