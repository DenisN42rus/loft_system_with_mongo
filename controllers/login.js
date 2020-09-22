const tokens = require('../libs/tokens');
const passport = require('passport');
const { serializeUser } = require('../libs/serializeUser');

const loginCtrl = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: 'Неверный логин или пароль!' });
      }
      if (user) {
        const token = await tokens.createTokens(user);
        res.json({
          ...serializeUser(user),
          ...token
        });
      }
    }
  )(req, res, next);
};

module.exports = loginCtrl;
