const express = require('express');
const router = express.Router();
const { updateUserCtrl, deleteUserCtrl, getUsersCtrl, refreshTokenCtrl } = require('../controllers');
const auth = require('../libs/auth');

router.get('/users', auth, getUsersCtrl);
router.patch('/users/:id/permission', auth, updateUserCtrl);
router.delete('/users/:id', auth, deleteUserCtrl);
router.post('/refresh-token', refreshTokenCtrl);

module.exports = router;
