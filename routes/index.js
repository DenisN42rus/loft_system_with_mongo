const express = require('express');
const router = express.Router();
const mainPage = require('./mainPage');
const auth = require('./auth');
const profile = require('./profile');
const news = require('./news');
const user = require('./user');

router.use('/api', auth);
router.use('/api', user);
router.use('/api', profile);
router.use('/api', news);
router.use('*', mainPage);

module.exports = router;
