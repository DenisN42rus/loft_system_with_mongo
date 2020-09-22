const renderMainPageCtrl = require('./renderMainPage');
const registrationCtrl = require('./registration');
const loginCtrl = require('./login');
const { getProfileCtrl, patchProfileCtrl } = require('./profile');
const { updateUserCtrl, deleteUserCtrl, getUsersCtrl, refreshTokenCtrl } = require('./user');
const {
  getNewsCtrl,
  addNewsCtrl,
  updateNewsCtrl,
  deleteNewsCtrl
} = require('./news');

module.exports = {
  renderMainPageCtrl,
  registrationCtrl,
  loginCtrl,
  getProfileCtrl,
  patchProfileCtrl,
  getNewsCtrl,
  addNewsCtrl,
  updateNewsCtrl,
  deleteNewsCtrl,
  updateUserCtrl,
  deleteUserCtrl,
  getUsersCtrl,
  refreshTokenCtrl
};
