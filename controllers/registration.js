const User = require('../db/models/user');
const tokens = require('../libs/tokens');
const { serializeUser } = require('../libs/serializeUser');

const registrationCtrl = async (req, res) => {
  const { username } = req.body;
  const user = await User.getUserByName(username);
  if (user) {
    return res.status(409).json({ message: 'Уже есть такой пользователь!' });
  }
  try {
    const newUser = await User.createUser(req.body);
    const token = await tokens.createTokens(newUser);
    res.json({
      ...serializeUser(newUser),
      ...token
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = registrationCtrl;
