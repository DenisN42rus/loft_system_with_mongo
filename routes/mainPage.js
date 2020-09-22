const express = require('express');
const router = express.Router();
const { renderMainPageCtrl } = require('../controllers');

router.get('/', renderMainPageCtrl);

module.exports = router;
