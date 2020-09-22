const User = require('../db/models/user');
const tokens = require('../libs/tokens');
const { serializeUser } = require('../libs/serializeUser');

const getUsersCtrl = async (req, res) => {
  const users = await User.getUsers();
  res.json(users.map((user) => serializeUser(user)));
};

const deleteUserCtrl = async (req, res) => {
  await User.deleteUser(req.params.id);
  res.status(204).json({ message: 'Пользователь удален!' });
};

const updateUserCtrl = async (req, res, next) => {
  try {
    const user = await User.updateUserPermission(req.params.id, req.body);
    res.json({
      ...serializeUser(user)
    });
  } catch (e) {
    next(e);
  }
};

const refreshTokenCtrl = async (req, res) => {
  const refreshToken = req.headers['authorization'];
  const user = tokens.getUserByToken(refreshToken);

  if (user.refreshToken == refreshToken) {
    const data = await tokens.refreshTokens(refreshToken);
    res.json({ ...data });
  } else {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    });
  }
};

module.exports = {
  updateUserCtrl,
  deleteUserCtrl,
  getUsersCtrl,
  refreshTokenCtrl
};
