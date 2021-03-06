const passport = require('passport');

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (!user || err) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized'
      });
    }
    next();
  })(req, res, next);
};

module.exports = auth;
