const express = require('express');
const router = express.Router();
const { getProfileCtrl, patchProfileCtrl } = require('../controllers');
const auth = require('../libs/auth');

router.get('/profile', auth, getProfileCtrl);
router.patch('/profile', auth, patchProfileCtrl);

module.exports = router;
