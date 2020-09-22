const express = require('express');
const router = express.Router();
const { registrationCtrl, loginCtrl } = require('../controllers');

router.post('/registration', registrationCtrl);
router.post('/login', loginCtrl);

module.exports = router;
