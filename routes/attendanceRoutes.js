const express = require('express');
const { create, getAttendance, getAllUserAttendance, logout } = require('../controllers/AttendanceController');
const { auth, isAdmin, isUser } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/attendance/create', auth, create);
router.get('/attendance/', auth, isUser, isAdmin, getAttendance);
router.post('/attendance/me', auth, getAttendance);
router.post('/attendance/all', auth, getAllUserAttendance);
router.post('/attendance/logout', auth, logout);

// router.get('/attendance/:id', auth, isAdmin, findCountry);
// router.put('/country/:id', auth, isAdmin, create);
// router.delete('/country/:id', auth, isAdmin, create)

module.exports = router;