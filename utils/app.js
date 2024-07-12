const cors = require('cors');
const express = require('express');
const dotenv = require("dotenv");
const i18n = require('../config/i18n-setup');
const setLocale = require('../middlewares/setLocale');


const authRoutes = require('../routes/authRoutes');
// const sessionRoutes = require('../routes/sessionRoutes');
const userRoutes = require('../routes/userRoutes');
// const commonRoutes = require('../routes/commonRoutes');

const screenshotRoutes = require('../routes/screenshotRoutes');
const postRoutes = require('../routes/postRoutes');

// const countryRoutes = require('./routes/countryRoutes');
// const stateRoutes = require('./routes/stateRoutes');
// const imageRoutes = require('../routes/imageRoutes');
// const attendanceRoutes = require('../routes/attendanceRoutes');
// const breakRoutes = require('../routes/breakRoutes');

// const categoryRoutes = require('../routes/categoryRoutes');
// const subCategoryRoutes = require('../routes/subCategoryRoutes');

// const chatRoutes = require('../routes/chatRoutes');
// const messageRoutes = require('../routes/messageRoutes');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));


app.use(cors());

// Middleware
// app.use(bodyParser.json());
app.use(i18n.init);
app.use(setLocale);

app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1', sessionRoutes);
app.use('/api/v1', userRoutes);
// app.use('/api/v1', imageRoutes);
// app.use('/api/v1', attendanceRoutes);
// app.use('/api/v1/break', breakRoutes);

// // common routes for "USER", "EMPLOYEE", "MANAGER", "ADMIN"
// app.use('/api/v1', commonRoutes);
app.use('/api/v1/screenshot/', screenshotRoutes);
app.use('/api/v1/post/', postRoutes);


// app.use('/api/v1/category', categoryRoutes);
// app.use('/api/v1/sub-category', subCategoryRoutes);

module.exports = { app };