const express = require('express');
const router = express.Router();
const { getNewsCtrl, addNewsCtrl, updateNewsCtrl, deleteNewsCtrl } = require('../controllers');
const auth = require('../libs/auth');

router.get('/news', auth, getNewsCtrl);
router.post('/news', auth, addNewsCtrl);
router.patch('/news/:id', auth, updateNewsCtrl);
router.delete('/news/:id', auth, deleteNewsCtrl);

module.exports = router;
